# Raven 发布清单

仓库：<https://github.com/shixiaoyu-funny/DSH-DesktopPet>  
包名：`dsh-plugin-raven-pet`  
发布方式：**GitHub Release tarball**（已上传 v0.1.0），npm 可选。

## 当前状态

- 代码已推送到 GitHub `main`；
- GitHub Release `v0.1.0` 已创建，附有 `dsh-plugin-raven-pet-0.1.0.tgz`（43.7MB）；
- 仓库 topic `dsh-plugin` 已添加；
- npm 发布被账号 2FA 策略拦住，不阻塞上架：目录条目改用 `tarball:`；
- 目录 PR 需等仓库创建满 1 天（见下）。

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

## 2. npm（可选）

如果以后要发布 npm：

```bash
npm login
npm publish --access public
```

当前账号 2FA 关闭，npm 发布返回 403，要求 2FA 或带 bypass 2FA 的 granular token。  
**不发布 npm 也可以上架**：目录条目已经带 `tarball:`，市场会优先用它。

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
