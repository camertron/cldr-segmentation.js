require 'json'
require 'twitter_cldr'
require 'pry-byebug'

BOUNDARY_TYPES = %w(word sentence)

task :dump_rule_sets do
  def javascriptify(regex_str)
    if regex_str.empty?
      "new RegExp('', 'u')"
    else
      "/#{regex_str}/u"
    end
  end

  BOUNDARY_TYPES.each do |boundary_type|
    rule_set = TwitterCldr::Segmentation::RuleSet.load(:en, boundary_type)

    File.open("./src/rule_sets/#{boundary_type}.js", 'w+') do |file|
      file << "export const #{boundary_type}BreakRuleSet = [\n"

      rule_set.rules.each_with_index do |rule, index|
        file <<
          "  new Rule(\n"\
          "    #{javascriptify(rule.left.to_regexp_str)},\n"\
          "    #{javascriptify(rule.right.to_regexp_str)},\n"\
          "    {isBreak: #{rule.break?}, id: '#{rule.id}'}\n"\
          "  )"
        file << "," if index < rule_set.rules.size - 1
        file << "\n"
      end

      file << "];\n"
    end
  end
end

task :dump_uli_exceptions do
  TwitterCldr.supported_locales.each do |locale|
    # last parameter not important for now, see:
    # https://github.com/twitter/twitter-cldr-rb/blob/31dfda36ad404dceb0858d73f39af04fa02f012d/lib/twitter_cldr/segmentation/rule_set_builder.rb#L49
    exceptions = TwitterCldr::Segmentation::RuleSetBuilder.send(
      :exceptions_for, locale, nil
    )

    unless exceptions.empty?
      File.open("./src/uliExceptions/#{locale}.js", 'w+') do |file|
        file << "export default [\n"
        file << exceptions.map { |exc| "  '#{exc}'" }.join(",\n")
        file << "\n]\n"
      end
    end
  end
end
