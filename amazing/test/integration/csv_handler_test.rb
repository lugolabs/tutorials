require 'test_helper'

class CsvHandlerTest < ActionDispatch::IntegrationTest
  test ".csv renders CSV" do
    get '/handlers.csv'
    assert_equal "Title,Author\nDa Vinci Code,Dan Brown\nName of the Rose,Umberto Eco\n", response.body
  end
end
