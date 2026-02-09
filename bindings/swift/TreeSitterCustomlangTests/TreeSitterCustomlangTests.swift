import XCTest
import SwiftTreeSitter
import TreeSitterCustomlang

final class TreeSitterCustomlangTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_customlang())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Customlang grammar")
    }
}
