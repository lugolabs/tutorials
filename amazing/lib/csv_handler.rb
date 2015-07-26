require 'csv'

module CsvHandler
  class CsvGenerator
    def self.generate
      file = CSV.generate do |csv|
        yield csv
      end
      file.html_safe
    end
  end

  class Handler
    def self.call (template)
      %{
        CsvHandler::CsvGenerator.generate do |csv|
          #{template.source}
        end
      }
    end
  end
end

