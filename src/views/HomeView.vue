<template>
  <div class="python-ide">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <h1 class="logo">
          <img
            style="margin-right: 10px; border-radius: 50%; width: 30px"
            src="../assets/picture/logo.jpg"
          />
          Python3在线编程
        </h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="editor-container">
        <div class="editor-header">
          <div class="header-left">
            <span class="language-label">Python3 源代码:</span>
            <div class="sample-selector">
              <el-select
                v-model="selectedSample"
                :disabled="pageLoading"
                class="sample-select"
                @change="loadSample"
              >
                <el-option
                  v-for="(item, index) in codeSamplesList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="header-right">
            <el-button
              color="#28a745"
              @click="runCode"
              :disabled="pageLoading"
              :loading="isRunning"
            >
              <span class="icon">▶</span>
              <span class="btn-text">{{ isRunning ? '运行中' : '运行' }}</span>
            </el-button>
          </div>
        </div>
        <div class="editor-wrapper">
          <div ref="editorContainer" class="monaco-editor"></div>
        </div>
      </div>

      <div class="output-container">
        <div class="output-header">
          <span class="output-label">运行结果:</span>
          <button class="clear-btn" @click="clearOutput">清空</button>
        </div>
        <div class="output-content">
          <pre v-if="output" class="output-text">{{ output }}</pre>
          <pre v-if="error" class="error-text">{{ error }}</pre>
          <div v-if="!output && !error && !isRunning" class="placeholder">
            点击运行按钮执行代码...
          </div>
          <div v-if="isRunning" class="loading">
            <div class="spinner"></div>
            正在执行代码...
          </div>
        </div>
      </div>
    </main>

    <!-- Mobile Run Button -->
    <div class="mobile-run-container">
      <div class="mobile-controls">
        <el-select
          v-model="selectedSample"
          :disabled="pageLoading"
          class="mobile-sample-select"
          @change="loadSample"
        >
          <el-option
            v-for="(item, index) in codeSamplesList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <button class="mobile-run-btn" @click="runCode" :disabled="isRunning || pageLoading">
          <span class="icon">▶</span>
          {{ isRunning ? '运行中...' : '点击运行' }}
        </button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p class="copyright">
          Copyright © 2025 Jack Zhang &nbsp;&nbsp;
          <el-tooltip
            class="box-item"
            effect="dark"
            content="程序源码地址"
            placement="top"
          >
            <span @click="openGithub()" style="cursor: pointer">
              <svg
                height="28"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                width="28"
                data-view-component="true"
                className="octicon octicon-mark-github v-align-middle"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </span>
          </el-tooltip>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as monaco from 'monaco-editor'
import { loadPyodide } from 'pyodide'
import { ElMessageBox } from 'element-plus'
import { codeSamplesList } from '@/tools/baseDic'
import { message } from 'ant-design-vue'

// Reactive data
const editorContainer = ref(null)
const output = ref('')
const error = ref('')
const isRunning = ref(false)
const pageLoading = ref(false)
let editor: any = null
let pyodide: any = null

// Default Python code
const defaultCode = codeSamplesList[0].code
//#region 全局loading控制
const loadingKey = 'loadingKey'
const openLoading = (info = '加载中') => {
  pageLoading.value = true
  message.loading({ content: `${info}...`, key: loadingKey })
}
const closeLoading = (info = '加载成功', type: 'success' | 'error' = 'success') => {
  if (type == 'success') {
    message.success({ content: `${info}`, key: loadingKey, duration: 2 })
  } else {
    message.error({ content: `${info}`, key: loadingKey, duration: 2 })
  }
  pageLoading.value = false
}
//#endregion

// Initialize Monaco Editor
const initEditor = () => {
  if (editorContainer.value) {
    // 检测是否为移动设备
    const isMobile = window.innerWidth <= 768

    editor = monaco.editor.create(editorContainer.value, {
      value: defaultCode,
      language: 'python',
      theme: 'vs',
      fontSize: isMobile ? 12 : 14,
      lineNumbers: 'on',
      minimap: { enabled: !isMobile },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
      // 移动端优化
      scrollbar: {
        verticalScrollbarSize: isMobile ? 8 : 14,
        horizontalScrollbarSize: isMobile ? 8 : 14,
      },
      // 触摸优化
      mouseWheelZoom: false,
      contextmenu: !isMobile,
    })

    // 监听窗口大小变化
    const resizeObserver = new ResizeObserver(() => {
      if (editor) {
        editor.layout()
      }
    })
    resizeObserver.observe(editorContainer.value)
  }
}

// Initialize Pyodide
const initPyodide = async () => {
  console.log('11', 11)
  loadPyodide()
    .then((res) => {
      console.log('xx')
      pyodide = res
      pyodide.registerJsModule('js_input', {
        getUserInput: getUserInput,
      })
      closeLoading('编译环境初始化完成')
    })
    .catch((err) => {
      console.error('Failed to load Pyodide:', err)
      error.value = '编译环境初始化失败，请刷新页面重试'
      closeLoading('编译环境初始化失败')
    })
}

// 在 JS 侧定义一个提供输入的函数（可弹窗或通过 input 元素）
const getUserInput = async (promptText) => {
  const inputValue: any = ref('')
  await ElMessageBox.prompt(`${promptText || '请输入'}`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    closeOnPressEscape: false,
  })
    .then(({ value }) => {
      inputValue.value = value
    })
    .catch(() => {})
  console.log('inputValue.value--->', inputValue.value)
  return inputValue.value
}

// Run Python code
const runCode = async () => {
  console.log('editor:', editor)
  console.log('pyodide:', pyodide)
  if (!editor || !pyodide) {
    error.value = '程序尚未初始化，请重试'
    return
  }

  isRunning.value = true
  output.value = ''
  error.value = ''

  try {
    const code = addAwaitToInput(editor.getValue())
    // Capture stdout
    await pyodide.runPythonAsync(`
import sys
import js_input
import asyncio
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
async def input(prompt=''):
    return await js_input.getUserInput(prompt)
    `)

    // Run user code
    await pyodide.runPythonAsync(code)

    // Get output
    const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()')
    const stderr = await pyodide.runPythonAsync('sys.stderr.getvalue()')

    if (stdout) {
      output.value = stdout
    }
    if (stderr) {
      error.value = stderr
    }
    if (!stdout && !stderr) {
      output.value = '代码执行完成，无输出'
    }
  } catch (err: any) {
    console.error('执行错误:', err)
    error.value = `执行错误: ${err.message}`
  } finally {
    isRunning.value = false
  }
}

const addAwaitToInput = (code) => {
  return code.replace(/(?<!await\s)(\binput\s*\(.*?\))/g, 'await $1')
}

// Clear output
const clearOutput = () => {
  output.value = ''
  error.value = ''
}

//#region 样例代码操作
const DefaultCodeValue = codeSamplesList[0].value
const selectedSample = ref(DefaultCodeValue)

// 加载样例代码
const loadSample = (value: string) => {
  if (value) {
    if (editor) {
      const code = codeSamplesList.find((item) => item.value === value)?.code ?? ''
      editor.setValue(code)
      editor.focus()
    }
  } else {
    // 重置选择框
    selectedSample.value = DefaultCodeValue
  }
}
//#endregion

const openGithub = () => {
  window.open('https://github.com/JACK-ZHANG-coming/python-web-editor')
}

// Lifecycle hooks
onMounted(() => {
  openLoading('正在初始化编译环境（首次初始化会慢一些，大概需要30秒左右）...')
  initEditor()
  setTimeout(() => {
    initPyodide()
  }, 1000)
})

onUnmounted(() => {
  if (editor) {
    editor.dispose()
  }
})
</script>

<style lang="scss" scoped>
.python-ide {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      padding: 0 1rem;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  .search-container {
    .search-input {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 20px;
      width: 300px;
      font-size: 0.9rem;
      outline: none;

      @media (max-width: 768px) {
        width: 100%;
        max-width: 280px;
      }

      &::placeholder {
        color: #999;
      }
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  max-width: 1200px;
  max-height: calc(100vh - 160px);
  margin: 1rem auto;
  padding: 0 1rem;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0.5rem auto;
    gap: 0.5rem;
  }
}

.editor-container {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .editor-header {
    height: 57px;
    background: #f8f9fa;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      flex: 0.9;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
      }

      .language-label {
        font-weight: 500;
        color: #333;
        font-size: 0.9rem;
        white-space: nowrap;

        @media (max-width: 768px) {
          font-size: 0.85rem;
        }
      }

      .sample-selector {
        width: calc(100% - 135px);
        @media (max-width: 830px) {
          width: calc(100% - 155px);
        }
        @media (max-width: 768px) {
          display: none;
        }
        .sample-select {
          border-radius: 4px;
          font-size: 0.85rem;
          background: white;
          cursor: pointer;
          min-width: 100px;

          @media (max-width: 768px) {
            width: 100%;
            font-size: 0.8rem;
          }

          &:focus {
            outline: none;
            border-color: #4caf50;
            box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
          }
        }
      }
    }

    .header-right {
      display: flex;
      gap: 0.75rem;

      @media (max-width: 768px) {
        display: none; // 在移动端隐藏，使用底部按钮
      }
    }

    .ai-tool-btn,
    .run-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
      white-space: nowrap;

      .btn-text {
        @media (max-width: 480px) {
          display: none;
        }
      }

      &:hover {
        transform: translateY(-1px);
      }

      @media (max-width: 768px) {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
      }
    }

    .ai-tool-btn {
      background: #007bff;
      color: white;

      &:hover {
        background: #0056b3;
      }
    }

    .run-btn {
      background: #28a745;
      color: white;

      &:hover:not(:disabled) {
        background: #218838;
      }

      &:disabled {
        background: #6c757d;
        cursor: not-allowed;
        transform: none;
      }
    }
  }

  .editor-wrapper {
    height: calc(100% - 57px);

    @media (max-width: 768px) {
      height: 300px;
    }

    .monaco-editor {
      height: 95%;
    }
  }
}

.output-container {
  flex: 0 0 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    flex: none;
  }

  @media (max-height: 525px) {
    display: none;
  }

  .output-header {
    background: #f8f9fa;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .output-label {
      font-weight: 500;
      color: #333;
      font-size: 0.9rem;

      @media (max-width: 768px) {
        font-size: 0.85rem;
      }
    }

    .clear-btn {
      padding: 0.4rem 0.8rem;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background 0.2s;

      @media (max-width: 768px) {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
      }

      &:hover {
        background: #c82333;
      }
    }
  }

  .output-content {
    height: calc(100% - 57px);
    overflow-y: auto;
    padding: 1rem;

    @media (max-width: 768px) {
      height: 250px;
      padding: 0.75rem;
    }

    .output-text {
      color: #333;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.4;
      margin: 0;
      white-space: pre-wrap;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }

    .error-text {
      color: #dc3545;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.4;
      margin: 0;
      white-space: pre-wrap;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }

    .placeholder {
      color: #6c757d;
      font-style: italic;
      text-align: center;
      margin-top: 2rem;
      font-size: 0.9rem;

      @media (max-width: 768px) {
        font-size: 0.85rem;
        margin-top: 1rem;
      }
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
      color: #6c757d;
      font-size: 0.9rem;

      @media (max-width: 768px) {
        font-size: 0.85rem;
        margin-top: 1rem;
      }

      .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #4caf50;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    }
  }
}

// 移动端运行按钮
.mobile-run-container {
  display: none;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
  z-index: 100;

  @media (max-width: 768px) {
    display: block;
  }

  .mobile-controls {
    display: flex;
    gap: 1rem;
    align-items: center;

    .mobile-sample-select {
      flex: 1;
      padding: 0 2rem 0 0;
      border-radius: 6px;
      font-size: 0.9rem;
      background: white;

      &:focus {
        outline: none;
        border-color: #4caf50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
      }
    }

    .mobile-run-btn {
      flex: 0 0 auto;
      padding: 0.75rem 1.5rem;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background 0.2s;
      white-space: nowrap;

      &:hover:not(:disabled) {
        background: #218838;
      }

      &:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }

      .icon {
        font-size: 1rem;
      }
    }
  }
}

.footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 1.5rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }

  .footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    text-align: center;

    .copyright {
      display: flex;
      align-items: center;
      color: #6c757d;
      font-size: 0.85rem;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 额外的移动端优化
@media (max-width: 480px) {
  .main-content {
    padding: 0 0.5rem;
  }

  .editor-container .editor-wrapper {
    height: 250px;
  }

  .output-container .output-content {
    height: 200px;
  }
}

// 横屏适配
@media (max-width: 768px) and (orientation: landscape) {
  .main-content {
    flex-direction: row;
  }

  .output-container {
    flex: 0 0 300px;
  }

  .mobile-run-container {
    display: none;
  }

  .editor-header .header-right {
    display: flex;
  }
}
</style>
