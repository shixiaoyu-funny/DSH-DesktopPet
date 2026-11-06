# Raven 发布清单

仓库：<https://github.com/shixiaoyu-funny/DSH-DesktopPet>  
包名：`dsh-plugin-raven-pet`  
npm 名称检查：registry 返回 404，基本可用（发布前再确认一次）。

## 时间门槛

- 仓库创建：2026-11-06 07:29 UTC（北京时间 15:29）
- 达到 1 天门槛：**2026-11-07 15:29（北京时间）之后**再提 PR
- 现在可以先把代码推上去、发 npm，等到时间后再提交目录 PR

## 1. 推到 GitHub

仓库目前只有 README，建议**把本目录作为仓库根目录**（插件包根 = 仓库根）：

```bash
git init
git add .
git commit -m "Raven desktop pet plugin"
git branch -M main
git remote add origin https://github.com/shixiaoyu-funny/DSH-DesktopPet.git
git push -u origin main --force
```

在 GitHub 仓库设置里添加 topic：`dsh-plugin`。

> `--force` 仅用于仓库目前只有一个占位 README 的情况；如果仓库里已有其他内容，先合并再推送。

## 2. 发布 npm（推荐）

```bash
npm login
npm publish --access public
npm view dsh-plugin-raven-pet version
```

发布前确认：

- `package.json` 的 `private` 已删除；
- `files` 包含 `assets/**`（35 个文件，解包约 41.7MB，tarball 约 42.7MB）；
- `assets/icon-180.png` 已存在（26KB）；
- `dsh.bundle` 与 `cordis.patch.yml` 存在；
- npm 账号已开启 2FA。

如果不发 npm，可以：

```bash
npm pack
```

把生成的 `dsh-plugin-raven-pet-0.1.0.tgz` 上传到 GitHub Release，并在目录条目里加：

```yaml
tarball: https://github.com/shixiaoyu-funny/DSH-DesktopPet/releases/download/v0.1.0/dsh-plugin-raven-pet-0.1.0.tgz
```

## 3. 提交目录 PR

1. Fork `awesome-dsh-plugin/awesome-dsh-plugin`。
2. 复制 `market/shixiaoyu-funny__DSH-DesktopPet.yml` 到：

```text
data/plugins/shixiaoyu-funny__DSH-DesktopPet.yml
```

3. 开 PR（只加这一个文件）。
4. CI 会检查 `dsh.bundle`、仓库年龄、YAML 与 README 生成；通过后维护者审核合并。
5. 合并后 `dsh-plugin-catalog` / dshmarket 会自动重建，不需要再向 catalog 提 PR。

## 如果插件放在子目录

如果仓库根不是插件包，而是 `dsh-plugin/` 子目录，条目要改成：

```yaml
url: https://github.com/shixiaoyu-funny/DSH-DesktopPet/tree/main/dsh-plugin
name: shixiaoyu-funny/DSH-DesktopPet#dsh-plugin
icon: https://raw.githubusercontent.com/shixiaoyu-funny/DSH-DesktopPet/main/dsh-plugin/assets/icon-180.png
```

文件名改为：

```text
data/plugins/shixiaoyu-funny__DSH-DesktopPet--dsh-plugin.yml
```

## 备注

- 角色与动作素材的分发权需要你自行确认；代码 MIT 不代表美术素材可以随意分发。
- 目录条目描述会按实际代码核对，不要写未实现的功能。
- 一个 PR 最多 3 条；这里只提交 1 条。
