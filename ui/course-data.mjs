export const lessons = [
  {
    id: '01',
    title: '一次模型调用',
    subtitle: '从一问一答开始',
    duration: '8 分钟',
    xp: 80,
    goal: '发送一条消息，并读出模型回答。',
    story: '第一步：不用改代码。点击运行实验，观察右侧三步。',
    concepts: [
      ['Prompt', '发给模型的话。'],
      ['Role', '谁说了这句话。'],
      ['Token', '模型处理文字的小块。'],
    ],
    code: `const prompt = '用一句话解释变量'

const response = await callModel({
  messages: [
    { role: 'user', content: prompt }
  ]
})

console.log(response.text)`,
    output: '变量是给一个值起的名字。',
    flow: ['用户输入', '模型请求', '模型回答'],
    challenge: {
      question: '哪一项是真正发给模型的话？',
      options: ['Prompt', '文件夹', '按钮颜色'],
      correct: 0,
      success: '正确。Prompt 就是本次输入。',
      retry: '再看一次：程序要把哪句话交给模型？',
    },
    teacher: '先看清一次调用。今天不加记忆和工具。',
    video: ['程序先收下问题。', '它把问题放进 user 消息。', '服务返回文字。', '程序打印这段文字。'],
  },
  {
    id: '02',
    title: '消息与角色',
    subtitle: '让第二轮看见第一轮',
    duration: '10 分钟',
    xp: 90,
    goal: '保存消息历史，让对话连续。',
    story: '电话有了纸和笔。每句话都会记下来。',
    concepts: [
      ['History', '以前的消息。'],
      ['System', '整场对话的规则。'],
      ['Assistant', '模型以前的回答。'],
    ],
    code: `const messages = [
  { role: 'system', content: '回答要简短' },
  { role: 'user', content: '我叫小北' },
  { role: 'assistant', content: '你好，小北' },
  { role: 'user', content: '我叫什么？' }
]

const response = await callModel({ messages })
console.log(response.text)`,
    output: '你叫小北。',
    flow: ['保存历史', '加入新问题', '发送全部消息'],
    challenge: {
      question: '第二轮怎样知道第一轮内容？',
      options: ['重新发送历史', '换一个颜色', '等待更久'],
      correct: 0,
      success: '正确。模型只看本次收到的消息。',
      retry: '模型不会自动记住。程序必须带上历史。',
    },
    teacher: '记忆不是魔法。它是一组再次发送的消息。',
    video: ['第一轮结束后，程序保存两条消息。', '第二轮加入新问题。', '程序把历史一起发送。', '模型因此能接着回答。'],
  },
  {
    id: '03',
    title: '代码上下文',
    subtitle: '让模型看见文件',
    duration: '12 分钟',
    xp: 100,
    goal: '只把相关代码加入消息。',
    story: '模型站在文件城外。上下文是递给它的地图。',
    concepts: [
      ['Context', '本次能看到的资料。'],
      ['Window', '一次能读的最大范围。'],
      ['Relevance', '资料和问题的关系。'],
    ],
    code: `const source = \`function add(a, b) {
  return a + b
}\`

const messages = [{
  role: 'user',
  content: \`解释这段代码：\\n\${source}\`
}]

const response = await callModel({ messages })`,
    output: 'add 接收两个值，并返回它们的和。',
    flow: ['选择文件', '读取文字', '加入问题'],
    challenge: {
      question: '面对大项目，应该先发送什么？',
      options: ['所有文件', '相关文件', '系统密码'],
      correct: 1,
      success: '正确。先找相关文件，再加入上下文。',
      retry: '越多不一定越好。先选和问题有关的内容。',
    },
    teacher: '上下文要小而准。不要一次塞进整个项目。',
    video: ['程序先找相关文件。', '它读取文件文字。', '代码和问题一起进入消息。', '模型现在能解释真实代码。'],
  },
  {
    id: '04',
    title: '工具调用',
    subtitle: '让模型请求动作',
    duration: '14 分钟',
    xp: 120,
    goal: '定义工具，并安全执行模型请求。',
    story: '模型有了门铃。它能请求开门，但不能自己开门。',
    concepts: [
      ['Tool', '程序允许的动作。'],
      ['Schema', '工具参数的形状。'],
      ['Result', '工具执行后的结果。'],
    ],
    code: `const tools = [{
  name: 'read_file',
  description: '读取一个文字文件',
  input: { path: 'string' }
}]

const reply = await callModel({ messages, tools })

if (reply.toolCall?.name === 'read_file') {
  const result = await readSafeFile(reply.toolCall.input.path)
  messages.push(reply.toolCall, result)
}`,
    output: '工具 read_file 已完成：读取 18 行。',
    flow: ['说明工具', '模型请求', '程序检查', '执行工具'],
    challenge: {
      question: '谁真正读取文件？',
      options: ['模型', '程序工具', 'Prompt'],
      correct: 1,
      success: '正确。模型提出请求，程序工具执行。',
      retry: '模型只生成请求。真正动作发生在程序中。',
    },
    teacher: '模型负责决定。程序负责检查和执行。',
    video: ['程序先告诉模型有哪些工具。', '模型选择工具和参数。', '程序检查参数与权限。', '通过后，工具才会运行。'],
  },
  {
    id: '05',
    title: 'Agent 循环',
    subtitle: '模型、工具、模型',
    duration: '15 分钟',
    xp: 140,
    goal: '把工具结果交回模型，直到任务结束。',
    story: '一次动作不够。循环让模型能看结果，再做下一步。',
    concepts: [
      ['Agent', '能选动作的程序。'],
      ['Loop', '重复执行一组步骤。'],
      ['Stop rule', '结束循环的条件。'],
    ],
    code: `for (let step = 0; step < 8; step += 1) {
  const reply = await callModel({ messages, tools })
  messages.push(reply.message)

  if (!reply.toolCall) {
    return reply.text
  }

  const result = await runTool(reply.toolCall)
  messages.push(result)
}

throw new Error('达到步骤上限')`,
    output: '第 1 步：读取文件\n第 2 步：解释代码\n任务完成。',
    flow: ['调用模型', '执行工具', '加入结果', '继续或结束'],
    challenge: {
      question: '为什么需要步骤上限？',
      options: ['让循环更安全', '让文字变蓝', '让文件更大'],
      correct: 0,
      success: '正确。上限能阻止无休止循环。',
      retry: '想一想：如果模型一直请求工具，会发生什么？',
    },
    teacher: '循环必须有出口。限制步骤，也允许用户取消。',
    video: ['模型先选择一个工具。', '程序执行并保存结果。', '模型看到结果后继续。', '没有工具请求时，本轮结束。'],
  },
  {
    id: '06',
    title: '文件工具',
    subtitle: '搜索、读取、修改',
    duration: '18 分钟',
    xp: 160,
    goal: '组合最小文件工具组。',
    story: 'Agent 有了放大镜、书页和铅笔。',
    concepts: [
      ['Search', '寻找相关文字。'],
      ['Read', '读取选中范围。'],
      ['Patch', '只改需要的部分。'],
    ],
    code: `const tools = {
  search: query => searchProject(query),
  read: path => readSafeFile(path),
  patch: change => applyCheckedPatch(change)
}

// 推荐顺序：先搜索，再读取，最后修改。
const matches = await tools.search('calculateTotal')
const source = await tools.read(matches[0].path)
const changed = await tools.patch(fixFor(source))`,
    output: '找到 3 处。读取 1 个文件。修改 2 行。',
    flow: ['搜索符号', '读取附近代码', '生成小修改', '展示差异'],
    challenge: {
      question: '修改前最稳妥的顺序是什么？',
      options: ['先改再读', '先搜索和读取', '删除整个文件'],
      correct: 1,
      success: '正确。先理解，再做最小修改。',
      retry: '铅笔落下前，先用放大镜和眼睛。',
    },
    teacher: '小修改更容易检查，也更容易撤回。',
    video: ['搜索缩小范围。', '读取提供准确上下文。', 'Patch 只改必要内容。', '最后展示修改差异。'],
  },
  {
    id: '07',
    title: '测试闭环',
    subtitle: '让失败指导修复',
    duration: '18 分钟',
    xp: 180,
    goal: '运行测试，并把失败结果交回模型。',
    story: '测试像裁判。它不猜，只看结果。',
    concepts: [
      ['Test', '检查行为的小程序。'],
      ['Failure', '没有满足预期。'],
      ['Evidence', '能证明结果的输出。'],
    ],
    code: `for (let attempt = 1; attempt <= 3; attempt += 1) {
  const test = await runCommand('npm test')

  if (test.ok) {
    return { status: 'done', evidence: test.output }
  }

  messages.push({ role: 'tool', content: test.output })
  await askModelToFix(messages)
}

return { status: 'blocked' }`,
    output: '第一次：1 项失败\n修改 1 行\n第二次：全部通过',
    flow: ['运行测试', '读取失败', '修改代码', '再次测试'],
    challenge: {
      question: '什么时候可以说修复完成？',
      options: ['模型说完成', '测试通过', '代码变长'],
      correct: 1,
      success: '正确。完成需要可检查的证据。',
      retry: '一句承诺不是证据。找一个真实检查结果。',
    },
    teacher: '不要相信“应该可以”。要看测试输出。',
    video: ['先运行最相关的测试。', '失败内容交回模型。', '模型做小修改。', '测试通过才算完成。'],
  },
  {
    id: '08',
    title: '上下文管理',
    subtitle: '大项目也能保持清楚',
    duration: '16 分钟',
    xp: 170,
    goal: '限制输入，并压缩旧消息。',
    story: '背包空间有限。留下地图，放下旧石头。',
    concepts: [
      ['Budget', '本轮允许的输入量。'],
      ['Summary', '保留重点的短文。'],
      ['Chunk', '文件中的一小段。'],
    ],
    code: `const context = []

context.push(await readChunk('src/cart.js', 40, 95))
context.push(await readChunk('test/cart.test.js', 1, 80))

if (countTokens(context) > tokenBudget) {
  context[0] = await summarize(context[0])
}

const reply = await callModel({ messages, context })`,
    output: '输入从 18,400 降到 6,200 token。重点仍保留。',
    flow: ['估算大小', '选择相关段', '压缩旧内容', '保留证据'],
    challenge: {
      question: '输入太大时，先做什么？',
      options: ['重复全部内容', '选择并压缩', '隐藏错误'],
      correct: 1,
      success: '正确。保留相关内容，压缩旧内容。',
      retry: '背包满了。应该整理，而不是继续塞。',
    },
    teacher: '好的上下文不是最多，而是够用。',
    video: ['先估算输入大小。', '只读取相关文件段。', '旧历史变成摘要。', '关键错误和修改证据必须保留。'],
  },
  {
    id: '09',
    title: '安全边界',
    subtitle: '让能力留在围栏内',
    duration: '20 分钟',
    xp: 200,
    goal: '限制路径、命令、时间和修改范围。',
    story: '强大的工具需要围栏、门锁和停止键。',
    concepts: [
      ['Permission', '动作是否被允许。'],
      ['Sandbox', '受限制的运行空间。'],
      ['Timeout', '等待多久后停止。'],
    ],
    code: `async function runSafe(toolCall) {
  assertInsideProject(toolCall.path)
  assertAllowedTool(toolCall.name)

  if (toolCall.risk === 'high') {
    return requestHumanApproval(toolCall)
  }

  return withTimeout(
    () => runInSandbox(toolCall),
    30_000
  )
}`,
    output: '路径检查：通过\n工具检查：通过\n沙箱执行：完成',
    flow: ['检查路径', '检查权限', '限制时间', '记录结果'],
    challenge: {
      question: '高风险修改应该怎样处理？',
      options: ['自动执行', '请求确认', '隐藏修改'],
      correct: 1,
      success: '正确。高风险动作需要人来确认。',
      retry: '风险越大，人越需要看见并决定。',
    },
    teacher: '安全不是最后补上。它包住每一次工具执行。',
    video: ['路径必须留在项目内。', '工具必须在允许列表中。', '命令有时间限制。', '高风险动作交给人决定。'],
  },
  {
    id: '10',
    title: 'Authentic Coding AI',
    subtitle: '组合完整系统',
    duration: '25 分钟',
    xp: 260,
    goal: '设计能理解、修改、验证和报告的 Coding AI。',
    story: '所有零件都在桌上。现在把它们接成真实系统。',
    concepts: [
      ['Planner', '选择下一步。'],
      ['Executor', '运行受控工具。'],
      ['Verifier', '检查结果证据。'],
    ],
    code: `async function solveCodingTask(task) {
  const state = createState(task)

  while (!state.done && state.steps < 12) {
    const action = await planNextAction(state)
    const result = await executeSafely(action)
    state.add(action, result)

    if (action.type === 'test' && result.ok) {
      state.done = true
    }
  }

  return {
    answer: state.summary(),
    diff: state.diff(),
    evidence: state.testResults()
  }
}`,
    output: '任务完成\n修改：2 个文件，7 行\n验证：6 项测试通过\n风险动作：0',
    flow: ['理解任务', '查找代码', '修改代码', '运行测试', '报告证据'],
    challenge: {
      question: '完整 Coding AI 的最后输出应该包含什么？',
      options: ['只有一句完成', '修改和验证证据', '模型名称'],
      correct: 1,
      success: '正确。真实完成要展示修改和验证证据。',
      retry: '别人怎样知道它真的完成了？需要可检查内容。',
    },
    teacher: '真实 Agent 不靠表演。它靠受控动作和验证证据。',
    video: ['任务先进入状态。', 'Planner 选择下一步。', 'Executor 安全执行工具。', 'Verifier 用测试检查结果。', '最后展示差异和证据。'],
  },
]

export const courseMeta = {
  title: 'Authentic Coding AI Academy',
  subtitle: '从一次模型调用到完整 Coding AI',
  totalXp: lessons.reduce((sum, lesson) => sum + lesson.xp, 0),
  privacy: '本课程只使用原创示例和通用概念。',
}
