# scripts/drag_tab_switcher_script.py
# SD WebUI は extensions/<name>/scripts/ 以下の .py ファイルを自動で読み込む。
# JavaScript は extensions/<name>/javascript/ 以下に置くだけで自動注入される。
# このファイルは「スクリプトとして認識させる」ためのプレースホルダ。

import modules.scripts as scripts
import gradio as gr


class DragTabSwitcher(scripts.Script):
    def title(self):
        return "Drag Tab Switcher"

    def show(self, is_img2img):
        # txt2img / img2img 両方で有効にするが UI には何も表示しない
        return scripts.AlwaysVisible

    def ui(self, is_img2img):
        # UIコンポーネント不要
        return []
