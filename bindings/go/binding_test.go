package tree_sitter_customlang_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_customlang "github.com/catmaximyoga/rust-customlang/tree/master/tree-sitter/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_customlang.Language())
	if language == nil {
		t.Errorf("Error loading Customlang grammar")
	}
}
