# kubeedge源码分析系列之整体架构

本系列的源码分析是在 commit da92692baa660359bb314d89dfa3a80bffb1d26c 之上进行的。

kubeedge是一个基于kubernetes构建的开放平台，使能边缘计算，将容器化应用编排功能扩展到边缘的节点和设备，并为云和边缘之间的网络，应用部署和元数据同步提供基础架构支持。

## 本文概述

本文从kubeedge的整体架构切入，首先梳理它包含的组件功能及组件之间的关系，然后分析各组件之间共用的框架和功能，最后分析组件中各模块之间共用的框架和功能。具体如下：

1. 组件功能及组件之间的关系
2. 组件的共用框架和功能
3. 组件中模块的共用框架和功能

## 组件功能及组件之间的关系

kubeedge中的组件及组件关系，先从官方的架构图说起，具体如下：

![kubeedge整体架构图](https://docs.kubeedge.io/en/latest/_images/kubeedge_arch.png)

从官方的架构图可以清晰地看到，kubeedge整体分Cloud和Edge两部分：

1. Cloud部分 是kubernetes api server与Edge部分的桥梁，负责将kubernetes的指令下发到Edge，同时将Edge的状态和事件同步到的kubernetes api server；
2. Edge部分 接受并执行Cloud部分下发的指令，管理各种负载，并将Edge部分负载的状态和事件同步到Cloud部分；

除了官方架构图展示的Cloud和Edge部分外，还有横跨Cloud和Edge的部分，具体如下：

1. Edgemesh 基于Istio的横跨Cloud和Edge的服务网格解决方案；
2. Edgesite 为满足在边缘需要完整集群功能的场景，定制的在边缘搭建既能管理、编排又能运行负责的完整集群解决方案；

## 组件的共用框架和功能

在源码层面，kubeedge核心独立组件包括cloudcore、edgecore、edgemesh和edgesite，除此之外还有mappers和keadm，具体如下下表：

|组件名|组件功能|备注|
|:---:|:---:|:---:|
|cloudcore|Cloud部分各功能模块的集合||
|edgecore|Edge部分各功能模块的集合||
|edgemesh|服务网格解决方案|源码目录中缺少makefile文件|
|edgesite|边缘独立集群解决方案||
|mappers|物联网协议实现包|本源码分析系列不涉及|
|keadm|kubeedge的一键部署工具|目前支持unbuntu，本源码分析系列不涉及|

以上组件中的cloudcore、edgecore、edgemesh和edgesite具有类似的代码结构，具体如下表：

|组件名|代码目录|组件启动入口|
|:---:|:---:|:---:|
|cloudcore|kubeedge/cloud|kubeedge/cloud/cloudcore/cloudcore.go，kubeedge/cloud/admission/admission.go，kubeedge/cloud/csidriver/csidriver.go|
|edgecore|kubeedge/edge|kubeedge/edge/cmd/edgecore/edgecore.go|
|edgemesh|kubeedge/edgemesh|kubeedge/edgemesh/cmd/edgemesh.go|
|edgesite|kubeedge/edgesite|kubeedge/edgesite/cmd/edgesite.go|

在cloudcore、edgecore、edgemesh和edgesite组件的源码中都使用了命令行框架[cobra](https://github.com/spf13/cobra) ,具体如下：

1. cloudcore代码入口

	kubeedge/cloud/cloudcore/cloudcore.go

	```go 
	
		func main() {
			command := app.NewCloudCoreCommand() //此函数是对cobra调用的封装
			...
		}
	
	```

	进入app.NewCloudCoreCommand()函数内部，也就是kubeedge/cloud/cloudcore/app/server.go中的NewCloudCoreCommand()函数中，具体如下：

	```go
	
		func NewCloudCoreCommand() *cobra.Command {
			...
			cmd := &cobra.Command{
				...
				Run: func(cmd *cobra.Command, args []string) {
				...	
				registerModules() //注册cloudcore中的功能模块
			    // start all modules
			    core.Run() //启动已注册的cloudcore中的功能模块
			},
		  }
		  ...
		}
		
	```
 	在NewCloudCoreCommand()函数中，通过	registerModules()函数注册cloudcore中的功能模块，通过core.Run()函数启动已注册的cloudcore中的功能模块，至于registerModules()函数注册了哪些功能模块，core.Run()函数怎么启动已注册功能模块的，详见“组件中模块的共用框架和功能”。

> 注意：kubeedge/cloud/admission/admission.go，kubeedge/cloud/csidriver/csidriver.go两个入口，目前貌似还没有用到，暂不分析。
 2. edgecore代码入口

	kubeedge/edge/cmd/edgecore/edgecore.go

	```go
	
		func main() {
			command := app.NewEdgeCoreCommand()//此函数是对cobra调用的封装
			...
		}
		
	```
进入app.NewEdgeCoreCommand()函数内部，也就是kubeedge/edge/cmd/edgecore/app/server.go中的NewEdgeCoreCommand()函数中，具体如下：

```go
		func NewEdgeCoreCommand() *cobra.Command {
			...
			cmd := &cobra.Command{
				...
				Run: func(cmd *cobra.Command, args []string) {
				...	
				registerModules() //注册cloudcore中的功能模块
			    // start all modules
			    core.Run() //启动已注册的cloudcore中的功能模块
			},
		  }
		  ...
		}
		
```

在NewEdgeCoreCommand()函数中，通过	registerModules()函数注册edgecore中的功能模块，通过core.Run()函数启动已注册的edgecore中的功能模块，至于registerModules()函数注册了哪些功能模块，core.Run()函数怎么启动已注册功能模块的，详见“组件中模块的共用框架和功能”。

3. edgemesh代码入口

	kubeedge/edgemesh/cmd/edgemesh.go


	```go
	
		func main() {
			
			...
			pkg.Register() //注册edgemesh的功能模块
			//Start server
			server.StartTCP() //启动一个tcp服务
		}
		
	```


	从main()函数中可以看到，edgemesh没有使用cobra，而是直接注册功能模块，然后启动了一个TCP服务。

4. edgesite代码入口

	kubeedge/edgesite/cmd/edgesite.go

	```go
	
		func NewEdgeSiteCommand() *cobra.Command {
			...
			cmd := &cobra.Command{
				...
				Run: func(cmd *cobra.Command, args []string) {
				...	
				registerModules() //注册cloudcore中的功能模块
			    // start all modules
			    core.Run() //启动已注册的cloudcore中的功能模块
			},
		  }
		  ...
		}
		
	```

	在NewEdgeSiteCommand()函数中，通过	registerModules()函数注册edgesite中的功能模块，通过core.Run()函数启动已注册的edgecore中的功能模块，至于registerModules()函数注册了哪些功能模块，core.Run()函数怎么启动已注册功能模块的，详见“组件中模块的共用框架和功能”。

到此，组件（cloudcore、edgecore、edgemesh和edgesite）层面的源码共用框架和功能分析就结束了，下面深入分析各组件中功能模块的共用框架和功能。

## 组件中模块的共用框架和功能

kubeedge组件中各个功能模块之间是通过Beehive来组织和管理的，Beehive是一个基于go-channels的消息框架，但本文的重点不是不是Beehive，所以只会分析kubeedge中用到的Beehive的相关功能。下面来深入cloudcore、edgecore、edgemesh和edgesite组件中，一起探究组件内部各功能模块的共用框架。


### cloudcore中模块的共用框架和功能分析

在“组件的共用框架和功能”的“cloudcore代码入口”部分已经分析到cloudcore中功能模块的注册和已注册功能模块的启动，本节就接着往下分析。

1. cloudcore中功能模块的注册

```go
		func registerModules() {
			cloudhub.Register()
			edgecontroller.Register()
			devicecontroller.Register()
		}
```


	从registerModules()函数中，可以知道cloudcore中有cloudhub、edgecontroller和devicecontroller共3个功能模块，进入Register()函数中来探索一下在模块注册中具体做了什么：

```go
	
		func Register() {
			core.Register(&cloudHub{})
		}
		
```

	在kubeedge/cloud/pkg/cloudhub/cloudhub.go中的Register()函数只是调用了kubeedge/beehive/pkg/core/module.go中的Register(...）函数，继续进入Register(...）函数，会看到：

```go
	
		...
		var (
			// Modules map
			modules         map[string]Module
			disabledModules map[string]Module
		)
		...
		func Register(m Module) {
			if isModuleEnabled(m.Name()) {
				modules[m.Name()] = m
				klog.Infof("Module %v registered", m.Name())
			} else {
				disabledModules[m.Name()] = m
				klog.Warningf("Module %v is not register, please check modules.yaml",m.Name())
			}
		}
		
```

从上面的变量和函数定义可以清楚地看到，cloudhub模块注册最终会将该模块的结构体放入一个map[string]Module类型的全局变量modules中。

按照cloudhub模块注册的思路分析，edgecontroller和devicecontroller也做了相同的事情，最终把各自的结构体放入一个map[string]Module类型的全局变量modules中。

cloudhub、edgecontroller和devicecontroller三个功能模块，之所以能够采用相同的注册流程，是因为它们都实现了kubeedge/beehive/pkg/core/module.go中的Module接口，Module接口具体内容如下：

```go
	
		type Module interface {
			Name() string
			Group() string
			Start(c *context.Context)
			Cleanup()
		}
		
```


可以分别在kubeedge/cloud/pkg/cloudhub/cloudhub.go，kubeedge/cloud/pkg/controller/controller.go，kubeedge/cloud/pkg/devicecontroller/module.go中找到cloudhub、edgecontroller和devicecontroller三个功能模块对Module接口的具体实现。


2. cloudcore中功能模块的启动

	kubeedge/beehive/pkg/core/core.go

```go
	
		//Run starts the modules and in the end does module cleanup
		func Run() {
			//Address the module registration and start the core
			StartModules()
			// monitor system signal and shutdown gracefully
			GracefulShutdown()
		}
		
```

从上面的Run()函数中可以知道，该函数通过StartModules()启动已经注册的modules，通过GracefulShutdown()将模块优雅的停止，至于如何启动和停止的，需要进入函数内容一探究竟：

	kubeedge/beehive/pkg/core/core.go

```go
		// StartModules starts modules that are registered
		func StartModules() {
			coreContext := context.GetContext(context.MsgCtxTypeChannel)
			modules := GetModules()
			for name, module := range modules {
				//Init the module
				coreContext.AddModule(name)
				//Assemble typeChannels for sendToGroup
				coreContext.AddModuleGroup(name, module.Group())
				go module.Start(coreContext)
				klog.Infof("Starting module %v", name)
			}
		}	
```

从上面 StartModules()函数的定义，可以清楚地知道该函数首先获得已经注册的module，然后通过一个for循环启动所有的module。

kubeedge/beehive/pkg/core/core.go

```go
		// GracefulShutdown is if it gets the special signals it does modules cleanup
		func GracefulShutdown() {
			c := make(chan os.Signal)
			signal.Notify(c, syscall.SIGINT, syscall.SIGHUP, syscall.SIGTERM,
		syscall.SIGQUIT, syscall.SIGILL, syscall.SIGTRAP, syscall.SIGABRT)
			select {
			case s := <-c:
				klog.Infof("Get os signal %v", s.String())
				//Cleanup each modules
				modules := GetModules()
				for name, module := range modules {
					klog.Infof("Cleanup module %v", name)
					module.Cleanup()
				}
			}
		}
```

GracefulShutdown()函数与StartModules()函数的逻辑类似，也是首先获得已经注册的module，然后通过一个for循环等待关闭所有的module。


### edgecore中模块的共用框架和功能分析

在“组件的共用框架和功能”的“edgecore代码入口”部分已经分析到edgecore中功能模块的注册和已注册功能模块的启动，本节就接着往下分析。

1. edgecore中功能模块的注册

```go
		// registerModules register all the modules started in edgecore
		func registerModules() {
			devicetwin.Register()
			edged.Register()
			edgehub.Register()
			eventbus.Register()
			edgemesh.Register()
			metamanager.Register()
			servicebus.Register()
			test.Register()
			dbm.InitDBManager()
		}
```

从registerModules()函数中，可以知道edgecore中有devicetwin、edged、edgehub、eventbus、edgemesh、metamanager、servicebus、和test共8个功能模块，还有一个db初始化函数，进入Register()函数中来探索一下在模块注册中具体做了什么：

```go
		// Register register devicetwin
		func Register() {
			dtclient.InitDBTable()
			dt := DeviceTwin{}
			core.Register(&dt)
		}
```

在kubeedge/edge/pkg/devicetwin/devicetwin.go中的Register()函数只是调用了kubeedge/beehive/pkg/core/module.go中的Register(...）函数，继续进入Register(...）函数，会看到：	
```go
			...
		var (
			// Modules map
			modules         map[string]Module
			disabledModules map[string]Module
		)
		...
		func Register(m Module) {
			if isModuleEnabled(m.Name()) {
				modules[m.Name()] = m
				klog.Infof("Module %v registered", m.Name())
			} else {
				disabledModules[m.Name()] = m
				klog.Warningf("Module %v is not register, please check modules.yaml",m.Name())
			}
		}
```

从上面的变量和函数定义可以清楚地看到，devicetwin模块注册最终会将该模块的结构体放入一个map[string]Module类型的全局变量modules中。

按照cloudhub模块注册的思路分析，edged、edgehub、eventbus、edgemesh、metamanager、servicebus、和test也做了相同的事情，最终把各自的结构体放入一个map[string]Module类型的全局变量modules中。

devicetwin、edged、edgehub、eventbus、edgemesh、metamanager、servicebus、和test共8个功能模块，之所以能够采用相同的注册流程，是因为它们都实现了kubeedge/beehive/pkg/core/module.go中的Module接口，Module接口具体内容如下：

```go
		type Module interface {
			Name() string
			Group() string
			Start(c *context.Context)
			Cleanup()
		}
```

可以分别在kubeedge/edge/pkg/devicetwin/devicetwin.go，kubeedge/edge/pkg/edged/edged.go，kubeedge/edge/pkg/edgehub/module.go，kubeedge/edge/pkg/eventbus/event_bus.go，kubeedge/edge/pkg/edgemesh/module.go，kubeedge/edge/pkg/metamanager/module.go，kubeedge/edge/pkg/servicebush/servicebus.go，kubeedge/edge/pkg/test/test.go中找到devicetwin、edged、edgehub、eventbus、edgemesh、metamanager、servicebus、和test共8个功能模块对Module接口的具体实现。	
2. edgecore中功能模块的启动

dgecore中功能模块的启动与“cloudcore中模块的共用框架和功能分析”中的“cloudcore中功能模块的启动”流程完全相同，大家可以参考改部分。

### edgemesh中模块的共用框架和功能分析

在“组件的共用框架和功能”的“edgemesh代码入口”部分已经分析到edgemesh中功能模块的注册和已注册功能模块的启动，本节就接着往下分析。

1. edgemesh中功能模块的注册


edgemesh中功能模块的注册可以参考”edgecore中功能模块的注册”，这里就不在赘述。


2. edgemesh中功能模块的启动

	edgemesh目前暂时没有模块启动逻辑。

### edgesite中模块的共用框架和功能分析

在“组件的共用框架和功能”的“edgesite代码入口”部分已经分析到edgemesh中功能模块的注册和已注册功能模块的启动，本节就接着往下分析。

1. edgesite中功能模块的注册


edgesite中功能模块的注册请参考”edgecore中功能模块的注册”，这里就不在赘述。


2. edgesite中功能模块的启动

	edgesite中功能模块的启动请参考”edgecore中功能模块的启动”，这里就不在赘述。





## 作者简介

### 崔广章

从2014年接触云计算以来，完整经历了多次云计算技术的出现、落地和普及，参与过多 个云 计算生产项目，项目涉及多个行业，其中比较有代表性的有基于OpenStack进行定制开发的运营商私有云、政务云，基于开源容器云方案进行定制开发的浙江移动数据中心操作系统 (DCOS)。2017年开始从事边缘计算，主导参与了以函数计算为实现载体的边缘计算在运营商车联网的尝试，主导参与了通过定制应用运行时和应用编排框架的边缘计算方案在运营商CDN的落地。目前在之江实验室。	
