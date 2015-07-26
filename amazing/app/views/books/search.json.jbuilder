json.array!(@books) do |book|
  json.title        book.title
  json.author       book.author
  json.price        number_to_currency(book.price)
  json.published_at book.published_at.strftime('%B %Y')
  json.image_url    book.image_url
end
