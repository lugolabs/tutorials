module ApplicationHelper
  def page_class
    "page-#{controller_name} #{action_name.gsub(/-/, '_')}"
  end
end
