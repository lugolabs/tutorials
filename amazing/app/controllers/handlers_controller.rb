class HandlersController < ApplicationController
  def index
    @books = []
    @books << Book.new(title: 'Da Vinci Code', author: 'Dan Brown')
    @books << Book.new(title: 'Name of the Rose', author: 'Umberto Eco')
  end
end
