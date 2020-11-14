require 'json'
require 'twitter_cldr'

BOUNDARY_TYPES = %w(word sentence grapheme line)

module Utils
  def self.camelize(str)
    str.gsub(/_(\w)/) { $1.upcase }
  end
end

task :dump_rule_sets do
  BOUNDARY_TYPES.each do |boundary_type|
    state_machine = TwitterCldr::Segmentation::StateMachine.instance(boundary_type, :en)

    File.open("./src/ruleSets/#{boundary_type}Break.js", 'w+') do |file|
      file << "RuleSet.#{boundary_type} = {"
      file << "\n  forwardTable: {"
      file << "\n    flags: #{state_machine.ftable.flags},"
      file << "\n    table: JSON.parse(`[\n"

      rows = state_machine.ftable.values.each_slice(20).map do |values|
        "      #{values.join(', ')}"
      end

      file << rows.join(",\n")
      file << "\n    ]`)\n  },"
      file << "\n\n  categoryTable: JSON.parse(`[\n"

      rows = state_machine.category_table.values.each_slice(4).map do |values|
        "    #{values.map(&:inspect).join(', ')}"
      end

      file << rows.join(",\n")
      file << "\n  ]`),"
      file << "\n\n  metadata: {\n"

      rows = state_machine.metadata.values.map do |key, val|
        "    #{Utils.camelize(key.to_s)}: #{val.inspect}"
      end

      file << rows.join(",\n")
      file << "\n  }"
      file << "\n};\n"
    end
  end
end

task :dump_suppressions do
  def trie2arr(node, prefix)
    node.each_key_and_child.flat_map do |key, child|
      if child.value
        prefix + [key].pack('U*')
      else
        trie2arr(child, prefix + [key].pack('U*'))
      end
    end
  end

  TwitterCldr.supported_locales.each do |locale|
    suppressions = TwitterCldr::Segmentation::Suppressions.instance(
      'sentence', locale
    )

    unless suppressions.is_a?(TwitterCldr::Segmentation::NullSuppressions)
      File.open("./src/suppressions/#{locale}.js", 'w+') do |file|
        file << "suppressions['#{locale}'] = ( () => {\n  let supp = Suppressions.create([\n"

        rows = trie2arr(suppressions.forward_trie.root, '').map do |item|
          "    '#{item}'"
        end

        file << rows.join(",\n")
        file << "\n  ]);\n"

        file << "\n  if (customSuppressions['#{locale}']) {"
        file << "\n    supp = supp.merge(customSuppressions['#{locale}']);"
        file << "\n  }\n"

        file << "\n  supp.lock();"
        file << "\n  return supp;"
        file << "\n})();"
      end
    end
  end
end

task :dump_tests do
  BOUNDARY_TYPES.each do |boundary_type|
    test_name = "#{boundary_type}_break_test"
    tests = TwitterCldr.get_resource('shared', 'segments', 'tests', test_name)

    File.write(
      File.join('spec', 'conformance', "#{Utils.camelize(test_name.chomp('_test'))}.json"),
      JSON.pretty_generate(tests)
    )
  end
end
