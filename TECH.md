# Waterpark Simulator 三页私有 MVP 技术规格

- 冻结日期：2026-08-11
- 对应产品规格：[PRODUCT.md](PRODUCT.md)
- 对应视觉规范：[DESIGN.md](DESIGN.md)
- 状态：第 4 步已通过；第 5 步已实现，等待用户验收

## Context

当前工作区有第三课事实材料、第四课审计、参考站截图、三套视觉方案和原创 favicon。第 4 步已经在独立子目录 `waterpark-simulator-site/` 创建本地网站，且没有初始化 Git，从而避免把研究原文、爬虫材料和课程档案带进未来代码仓库。

技术范围已锁定为 Next.js App Router、TypeScript、Tailwind 和 MDX。具体依赖版本在第 4 步创建项目时根据官方兼容信息记录；本规格不猜测未来版本号。

## Proposed changes

### 1. 项目边界

- 仅创建 `waterpark-simulator-site/`，不改造成整个研究工作区的 Git 仓库。
- 默认使用 Server Components。
- 只有手机菜单确实需要开关状态时使用一个小型 Client Component。
- 不添加数据库、CMS、API 路由、账号、表单、分析 SDK 或无必要的状态管理库。
- 不连接 GitHub、Vercel、Cloudflare 或任何正式域名。

### 2. 计划目录

```text
waterpark-simulator-site/
├─ PRODUCT.md
├─ TECH.md
├─ DESIGN.md
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ guides/page.tsx
│  ├─ multiplayer-guide/page.tsx
│  ├─ staff-guide/page.tsx
│  ├─ console-platforms-guide/page.tsx
│  ├─ not-found.tsx
│  ├─ robots.ts
│  └─ globals.css
├─ components/
│  ├─ site-header.tsx
│  ├─ mobile-nav.tsx
│  ├─ site-footer.tsx
│  ├─ home-hero.tsx
│  ├─ guide-card.tsx
│  ├─ guide-article.tsx
│  ├─ source-list.tsx
│  └─ checked-status.tsx
├─ content/guides/
│  ├─ multiplayer-guide.mdx
│  ├─ staff-guide.mdx
│  └─ console-platforms-guide.mdx
├─ lib/content/
│  ├─ types.ts
│  └─ define-guide.ts
├─ public/
│  ├─ brand/
│  └─ images/
├─ scripts/check-internal-links.mjs
├─ next.config.ts
├─ package.json
└─ tsconfig.json
```

实际脚手架生成的必需配置文件可以保留，但不得借机添加计划外页面或服务。

`PRODUCT.md`、`TECH.md` 和 `DESIGN.md` 已移入网站子目录，课程记录中的链接也已同步更新。三份规格只保留一份权威副本，确保未来 GitHub 私有仓库包含实现依据，又不会把原始研究档案一起推送。

### 3. 内容接口

```ts
export interface GuideSection {
  id: string;
  title: string;
}

export interface SourceCitation {
  title: string;
  url: string;
  identity: "official" | "platform" | "developer-identified" | "third-party" | "community";
  retrievedAt: string;
  versionPlatformScope: string;
  boundary: string;
}

export interface GuidePage {
  slug: "multiplayer-guide" | "staff-guide" | "console-platforms-guide";
  title: string;
  description: string;
  quickAnswer: string;
  checkedAt: string;
  scope: string;
  status: "source-checked" | "source-checked-with-unknowns";
  sections: GuideSection[];
  unknowns: string[];
  sources: SourceCitation[];
  updateTrigger: string[];
}
```

第 5 步实现时补充了 `scope` 和 `unknowns` 两个必填字段。原因是产品规格要求每页直接展示版本/平台范围和未知项；把它们纳入类型约束可以避免正文存在但页面状态区遗漏，也不会新增页面或服务。

每个 MDX 文件默认导出文章正文，同时通过 `defineGuide({...})` 导出一个符合 `GuidePage` 的 `guide` 对象。`defineGuide` 负责 TypeScript 类型约束，并在开发/构建时拒绝缺少 slug、标题、核验日期、来源或更新触发条件的内容。

`sections` 只保存目录用的 `id` 和标题；详细正文保留在 MDX 中，避免同一段内容维护两份。

### 4. MDX 和路由

- 使用官方 Next.js MDX 集成方式，并在 `next.config.ts` 中启用 `.mdx` 页面扩展。
- 使用 `remark-gfm` 解析文章中的 Markdown 表格；手机端表格只在自身容器内横向滚动，不带动整页溢出。
- 三条详情路由是显式文件夹，不使用根级动态 `[slug]`，防止意外生成未批准页面。
- 每条路由导入对应 MDX 和 `guide` 数据，再交给共享 `GuideArticle` 渲染。
- `/guides` 只读取三份 `guide` 元数据生成卡片，不复制 MDX 正文。
- MDX 允许的组件由统一映射提供；不允许文章自行插入任意脚本或远程组件。

### 5. 页面与组件

- `app/layout.tsx`：全局字体、metadata 基础、Header、Footer 和主内容跳转链接。
- `SiteHeader`：桌面导航；`MobileNav` 只负责窄屏开关、焦点和点击后关闭。
- `HomeHero`：按第 1 套效果图实现左文右图，手机端重新排版。
- `GuideCard`：首页和 Guides 共用，通过内容数据控制标题、说明、日期和链接。
- `GuideArticle`：统一直接答案、核验状态、MDX 正文、未知项、来源和更新触发区。
- `SourceList`：按 `SourceCitation` 字段展示来源身份和边界，不生成“可信度分数”。
- `not-found.tsx`：只链接首页和 Guides。

### 6. 视觉和资产

- 将现有 `assets/brand/waterpark-simulator-favicon/` 中所需文件复制到站点 `public/brand/` 或 Next.js metadata 约定位置，原始研究资产仍保留在工作区。
- 不使用效果图中的临时棕榈树 Logo。
- 主视觉和卡片图片必须是单独生成的原创本地素材或具有明确使用许可的素材，不从效果图、官网或参考站截图裁取。
- 使用 `next/image`，提供固定尺寸和响应式 `sizes`，减少 CLS。
- 图标统一使用一套开源 React 图标库；不手写临时 SVG，不用 emoji 代替界面图标。
- 颜色、字体、断点和交互以 [DESIGN.md](DESIGN.md) 为准。

### 7. Metadata 和禁止索引

环境变量：

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_INDEXING_ENABLED=false
```

- 缺少 `NEXT_PUBLIC_SITE_URL` 时本地回退为 `http://localhost:3000`；正式域名购买后再配置。
- 只有 `NEXT_PUBLIC_INDEXING_ENABLED` 严格等于 `true` 时才允许索引。
- 默认 metadata 输出 `noindex, nofollow`。
- `robots.ts` 在禁止索引时对所有爬虫返回 `Disallow: /`。
- 每页独立设置 title、description 和规范路径；`keywords` 可以保留为课程兼容字段，但不作为排名或验收指标。
- 公开部署前必须单独验收并显式改变索引开关，不能因环境变量缺失自动开放。

### 8. 内容数据流

```text
第三课已验收材料
  → 第 5 步写作与事实复核
  → MDX 正文 + GuidePage 元数据
  → 显式路由页面
  → 共享文章组件
  → 静态构建输出
```

参考站截图和三套视觉图只影响布局，不进入事实数据流。

### 9. 无障碍与响应式实现

- 使用语义 `header`、`nav`、`main`、`article`、`footer` 和正确标题层级。
- 提供跳至主内容链接、明显焦点样式、菜单 `aria-expanded`/`aria-controls` 和关闭逻辑。
- 手机验收宽度为 `390×844`，并额外检查中间宽度；整页不得横向滚动。
- 宽表格放入可访问的局部滚动容器，不能撑破页面。
- 动效仅使用轻量 CSS，并尊重 `prefers-reduced-motion`。

### 10. 失败处理

- 静态内容不存在或元数据不完整时让开发或生产构建失败，不在页面显示 `TODO`、`Lorem ipsum` 或空来源框。
- 未批准路由统一进入 404，不创建薄占位页。
- 图片缺失时使用可读的文字布局，不热链外部图片作为临时补丁。
- 外部来源失效时，保留来源名称和边界，在第 5 步返工；不自动换成未经核验的第三方链接。

## Testing and validation

### 自动检查

1. `npm run lint`：代码和 MDX 集成无 lint 错误。
2. `npm run typecheck`：`tsc --noEmit` 通过，三份 `GuidePage` 数据符合接口。
3. `npm run build`：生产构建通过，五条路由均生成。
4. `npm run check:links`：检查五条站内路由和文档中的站内链接，不把外网瞬时可访问性伪装成构建结果。
5. 文本扫描：旧游戏名、`Switch` 支持、虚构兑换码、占位符和未批准路由均为零。

### 浏览器检查

- 使用用户已选的 Chrome 打开本地站点。
- 桌面和 `390×844` 手机视口逐条访问五条路由。
- 点击桌面导航、手机菜单、三张卡片、返回链接和 404 入口。
- 检查控制台错误、横向溢出、键盘焦点、标题层级、颜色对比和图片跳动。
- 将首页截图与第 1 套效果图按相同视口对照；只修正视觉偏差，不复制草图中的事实错误。

### PRODUCT.md 对应关系

| 产品行为 | 验证方式 |
| --- | --- |
| 1–3：固定路由、英文、共享导航 | 构建输出、内部链接检查、逐页点击 |
| 4–7：首页与 Guides | 桌面/手机截图和卡片链接检查 |
| 8–16：直接答案、来源、未知项 | `GuidePage` 校验、MDX 内容审查、逐页验收 |
| 17–18：外链与独立声明 | 链接属性和页尾检查 |
| 19–21：手机、键盘、404 | Chrome 手动验收 |
| 22：metadata 与禁止索引 | 页面头部和 `robots.txt` 检查 |
| 23–24：静态体验与视觉纠错 | 构建、占位符扫描、同尺寸视觉对照 |

## Risks and mitigations

| 风险 | 处理 |
| --- | --- |
| 效果图把 Switch 画成支持平台 | 设计规范和文本扫描明确禁止；平台数据只来自已核验材料 |
| MDX 元数据与正文不一致 | 单一 `guide` 导出 + 构建校验 + 第 5 步逐页事实审查 |
| 首页图片造成慢加载或 CLS | 本地优化图片、固定尺寸、正确 `sizes`，首屏只保留一张主要视觉 |
| 手机菜单引入不必要客户端代码 | 仅菜单组件使用最小状态，其余保持 Server Components |
| 私有预览意外收录 | metadata 与 robots 双重禁止；只有显式 `true` 才开放 |
| 参考站资产误入仓库 | 所有站点资产从本项目原创目录复制，代码仓库不包含参考站截图 |

## 实施顺序

1. 第 3 步规格经用户确认。
2. 第 4 步只创建脚手架、共享组件和五条空路由，验收布局与响应式。
3. 第 5 步再写入三篇 MDX 正文和最终事实。
4. 第 6 步完成技术与视觉 QA。
5. 只有用户之后明确授权，才执行 GitHub 推送；部署和域名仍不在本轮范围。
