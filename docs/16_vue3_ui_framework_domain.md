

## Vue3 UI  Framework - 域名配置

> 项目官网已经部署到 `GitHub Pages` 上了，但是你懂的，`GitHub` 间歇性被墙，所以我们考虑通过配置 `CNAME` 域名实现全站加速以提升用户体验
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 准备

- 域名
- 原始网站域名或公网 `IP` 地址

> 这里我们以 [阿里云](https://www.aliyun.com/) 为例讲解，其他域名供应商配置方法基本类似

### 配置域名

1. 登录阿里云控制台
2. 进入 `DNS` 管理界面
3. 点击配置按钮
4. 点击添加记录
5. 类型选择 `CNAME`
6. 主机名称根据需要输入
7. 输入你的原始网站的域名或者公网 `IP` 地址
8. 点击确认按钮完成配置

![image-20211228104354433](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211228104354433.png)

![image-20211228104507481](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211228104507481.png)

![image-20211228104612795](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211228104612795.png)

### 项目配置

1. 进入仓库配置界面
2. 选择页面菜单
3. 在 `Custom domain` 下输入你配置的阿里域名
4. 点击 `Save` 按钮
5. 等待几秒钟，就可以看到配置成功的提示了

![image-20211228105821689](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211228105821689.png)

> **注意**
>
> 建议勾选强制启用 `HTTPS`
>
> > HTTPS provides a layer of encryption that prevents others from snooping on or tampering with traffic to your site.
> > When HTTPS is enforced, your site will only be served over HTTPS

### 仓库源码变化

配置完成后，切换到 `publish` 分支，我们可以看到在项目的根目录下多了一个 `CNAME` 文件，打开文件后，可以看到文件的内容如下：

```
ui.jeremywu.top
```

![image-20211228110750416](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211228110750416.png)

![image-20211228110829082](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211228110829082.png)

所以，我们也可以在项目部署之前创建一个 `CNAME` 文件，内容输入你要配置的名称，这样就不用界面进行配置了 :laughing:

### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top

### 订阅号

微信扫一扫关注我，共同学习、分享，获取全栈开源技术最新推送 :rocket:

![全栈民工](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/wechat_search_qrcode_standard.png)



感谢阅读 :coffee:

