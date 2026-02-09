// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterCustomlang",
    products: [
        .library(name: "TreeSitterCustomlang", targets: ["TreeSitterCustomlang"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterCustomlang",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterCustomlangTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterCustomlang",
            ],
            path: "bindings/swift/TreeSitterCustomlangTests"
        )
    ],
    cLanguageStandard: .c11
)
