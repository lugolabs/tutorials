require 'test_helper'

class MarkdownHandlerTest < ActionDispatch::IntegrationTest
  test ".md renders markdown" do
    get '/handlers.md'
    assert_match '<strong>Markdown</strong> is great.', response.body, "tags"
    assert_match '<code class="js">', response.body, "language class"
  end
end
