# frozen_string_literal: true

###
# prerequirement
# npm i -g @squoosh/cli
###

dirs = Dir.glob('*')

dirs.each do |dir|
  next unless FileTest.directory? dir

  command = "squoosh-cli --webp '{}' -d #{dir} #{dir}/*.png "
  p command
  # e.g. squoosh-cli --webp '{}' -d cloudwatch-logs cloudwatch-logs/*.png
  system(command)
end
