ActionView::Template.register_template_handler :md, MarkdownHandler
ActionView::Template.register_template_handler :am, CsvHandler::Handler
