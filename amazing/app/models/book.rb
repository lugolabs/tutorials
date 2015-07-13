class Book < ActiveRecord::Base
  def self.search(term)
    where('LOWER(title) LIKE :term OR LOWER(author) LIKE :term', term: "%#{term.downcase}%")
  end
end
