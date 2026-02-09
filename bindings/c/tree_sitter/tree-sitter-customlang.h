#ifndef TREE_SITTER_CUSTOMLANG_H_
#define TREE_SITTER_CUSTOMLANG_H_

typedef struct TSLanguage TSLanguage;

#ifdef __cplusplus
extern "C" {
#endif

const TSLanguage *tree_sitter_customlang(void);

#ifdef __cplusplus
}
#endif

#endif // TREE_SITTER_CUSTOMLANG_H_
