require 'find'

directory = './posts'

urls = []

Find.find(directory) do |path|
  next unless path =~ /\.md$/

  content = File.read(path)

  urls.push(content.scan(%r{href="(https://amzn\.to/\w+)"}))
end

urls.uniq.sort.each { |url| puts url }
