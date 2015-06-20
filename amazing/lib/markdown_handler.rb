class MarkdownHandler
  class << self
    def call(template)
      compiled_source = erb.call(template)
      "MarkdownHandler.render(begin;#{compiled_source};end)"
    end

    def render(text)
      key = cache_key(text)
      Rails.cache.fetch key do
        markdown.render(text).html_safe
      end
    end

    private

      def cache_key(text)
        Digest::MD5.hexdigest(text)
      end

      def markdown
        @markdown ||= Redcarpet::Markdown.new(HTMLWithPygments, fenced_code_blocks: true, autolink: true, space_after_headers: true)
      end

      def erb
        @erb ||= ActionView::Template.registered_template_handler(:erb)
      end
  end

  class HTMLWithPygments < Redcarpet::Render::HTML
    def block_code(code, lang)
      lang = lang && lang.split.first || "text"
      output = add_code_tags(
        Pygmentize.process(code, lang), lang
      )
    end

    def add_code_tags(code, lang)
      code = code.sub(/<pre>/,'<div class="lang">' + lang + '</div><pre><code class="' + lang + '">')
      code = code.sub(/<\/pre>/,"</code></pre>")
    end
  end
end
