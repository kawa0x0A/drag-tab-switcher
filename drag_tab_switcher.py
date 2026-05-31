# drag_tab_switcher.py
# Stable Diffusion WebUI Extension - Drag Tab Switcher
#
# JavaScript のみで動作する軽量拡張機能のため、
# Python 側は WebUI にエクステンションとして認識させる最低限の記述のみ。

import gradio as gr


def on_ui_tabs():
    """拡張機能タブは不要なので何も返さない"""
    return []


# scripts/ フォルダにある場合は Script クラスを継承して登録するが、
# このファイルはルートに置く場合の代替エントリポイント。
