require 'fileutils'

links = {
  'https://amzn.to/3J1aqvr' => 'https://amzn.to/4dQdE2m',
  'https://amzn.to/3JQjt2J' => 'https://amzn.to/3TazIwf',
  'https://amzn.to/3PXwhYu' => 'https://amzn.to/3zgJmGZ',
  'https://amzn.to/3Ph8jag' => 'https://amzn.to/47eL9sP',
  'https://amzn.to/3VkPbvG' => 'https://amzn.to/3ANtaO7',
  'https://amzn.to/49WA14f' => 'https://amzn.to/47hEH4q',
  'https://amzn.to/3v7huTV' => 'https://amzn.to/3ANWy6K',
  'https://amzn.to/49ULoda' => 'https://amzn.to/4cSmECI',
  'https://amzn.to/49Npw3f' => 'https://amzn.to/4g8lh5V',
  'https://amzn.to/3vn1qgD' => 'https://amzn.to/4e8OiwC',
  'https://amzn.to/43u2YSL' => 'https://amzn.to/4e6M7ti',
  'https://amzn.to/49XImF1' => 'https://amzn.to/4eakfV7',
  'https://amzn.to/497A3oY' => 'https://amzn.to/4dQdecl',
  'https://amzn.to/3UZ6iD2' => 'https://amzn.to/3Tedn13',
  'https://amzn.to/4ajZBjl' => 'https://amzn.to/3AP8SUt',
  'https://amzn.to/3QuqgCJ' => 'https://amzn.to/4dRjWik',
  'https://amzn.to/3RYfWmk' => 'https://amzn.to/3Tgr6US',
  'https://amzn.to/3TS1AWW' => 'https://amzn.to/3MxHugb',
  'https://amzn.to/49gl77K' => 'https://amzn.to/4earbBH',
  'https://amzn.to/3VIP79k' => 'https://amzn.to/3XuCD5B',
  'https://amzn.to/3VQzH2H' => 'https://amzn.to/3Zi5mvE',
  'https://amzn.to/3VVsmiu' => 'https://amzn.to/3z66TKG',
  'https://amzn.to/3wvSjuC' => 'https://amzn.to/3MxHA7x',
  'https://amzn.to/43QJd87' => 'https://amzn.to/3ZcNaDY',
  'https://amzn.to/43SdymD' => 'https://amzn.to/4gfnywj',
  'https://amzn.to/47Re8SH' => 'https://amzn.to/3XuTnd2',
  'https://amzn.to/49BlcmN' => 'https://amzn.to/3Xx2E4t',
  'https://amzn.to/49QSKNY' => 'https://amzn.to/3XvA3fG',
  'https://amzn.to/4aRaXM2' => 'https://amzn.to/47fcefs',
  'https://amzn.to/4arnC8Z' => 'https://amzn.to/47gwAFi',
  'https://amzn.to/4cHc0QI' => 'https://amzn.to/3ASmUog',
  'https://amzn.to/4dbJnLp' => 'https://amzn.to/4cMo7KY'
}

# postsディレクトリ内のファイルを取得
Dir.glob('posts/*.md') do |file_path|
  # ファイルの内容を読み込み
  content = File.read(file_path)

  # linksのキーを値に置換
  links.each do |old_link, new_link|
    content.gsub!(old_link, new_link)
  end

  # 置換後の内容を上書き保存
  File.write(file_path, content)
end

puts 'link replaced'
# 