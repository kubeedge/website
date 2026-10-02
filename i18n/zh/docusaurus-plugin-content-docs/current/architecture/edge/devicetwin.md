---
title: DeviceTwin
sidebar_position: 4
---
## 概述

DeviceTwin 模块负责存储设备状态，处理设备属性和设备孪生操作，在边缘设备与边缘节点之间创建关联，将设备状态同步到云端，并在边缘和云端之间同步设备孪生信息。它还为应用程序提供查询接口。DeviceTwin 由四个子模块（即 Membership 模块、Communication 模块、Device 模块和 Twin 模块）组成，以履行 DeviceTwin 模块的职责。



## 由 DeviceTwin Controller 执行的操作

 以下是 DeviceTwin Controller 的功能：

  - 将元数据同步到数据库/从数据库同步元数据 （ Sqlite ）
  - 注册和启动子模块
  - 将消息分发到子模块
  - 健康检查


### 将元数据同步到/从数据库同步 （ Sqlite ）

对于边缘节点管理的所有设备，DeviceTwin 执行以下操作：

   - 它检查设备是否在 DeviceTwin Context 中，如果没有，它会进行添加。
   - 从数据库中查询设备
   - 从数据库中查询设备属性
   - 从数据库查询设备孪生属性
   - 将设备、设备属性和设备孪生数据合并到一个结构中，并将其存储在 DeviceTwin Context中


### 注册和启动子模块

注册 DeviceTwin 的四个子模块，并将它们作为单独的 go 协程启动


### 将消息分发到子模块

1. 持续监听 beehive 框架中的任何 DeviceTwin 消息。
2. 将接收到的消息发送到 DeviceTwin 的通信模块。
3. 根据消息源对消息进行分类，即消息是来自 eventBus、edgeManager 还是 edgeHub，并填充模块的动作模块映射（ActionModuleMap 是动作到模块的映射）
4. 将消息发送到所需的 DeviceTwin 模块


### 健康检查

 DeviceTwin 控制器定期（每 60 秒）向子模块发送 ping 消息。每个子模块在收到 ping 后都会自行更新 map 中的时间戳。控制器检查模块的时间戳是否超过 2 分钟，如果为 true，则重新启动子模块。


## 模块

DeviceTwin 由 4 个模块组成，分别是：

- Membership 模块
- Twin 模块
- Communication 模块
- Device 模块

### Membership 模块

Membership 模块主要职责是是为通过云添加到边缘节点的新设备提供成员资格。该模块将新添加的设备绑定到边缘节点，并在边缘节点和边缘设备之间创建成员关系。

该模块执行的主要功能是：

1. 初始化动作回调映射，是一个 map[string] Callback，包含可以执行的回调函数
2. 接收发送到 Membership 模块的消息
3. 对于每条消息，都会读取动作消息并调用相应的函数
4. 从心跳通道接收心跳，并向控制器发送心跳

以下是 Membership 模块可以执行的操作回调：

   - dealMembershipGet
   - dealMembershipUpdated
   - dealMembershipDetail

**dealMembershipGet**: dealMembershipGet() 从缓存中获取与特定边缘节点关联的设备的信息。
   - eventbus 首先在其订阅的主题（membership-get）上接收一条消息。
   - 此消息到达 DeviceTwin 控制器，由它进一步将消息发送到 Membership 模块。
   - Membership 从缓存中获取与边缘节点关联的设备，并将信息发送到 Communication 模块。它还处理在执行上述过程时可能出现的错误，并将错误发送到通信模块而不是设备详细信息。
   - Communication 模块将信息发送给 eventbus 组件，eventbus 组件进一步在指定的 MQTT topic上发布结果。

  ![Membership Get()](/img/devicetwin/membership-get.png)


**dealMembershipUpdated**: dealMembershipUpdated() 函数用于更新节点的成员资格详情。它将新添加的设备添加到边缘组中，将已移除的设备从边缘组中删除，并在设备详情发生变更时进行更新。
   - Edgehub 模块从云端接收成员资格更新消息，并将该消息转发到 DeviceTwin 控制器，后者进一步将其转发到 Membership 模块。
   - Membership 模块添加新添加的设备、删除最近删除的设备以及更新数据库和缓存中已存在的设备。
   - 更新设备的详细信息后，一条消息将发送到 DeviceTwin 的 Comunication 模块，该模块将消息发送到要在给定 MQTT 主题上发布的 eventbus 模块。

  ![Membership Update](/img/devicetwin/membership-update.png)


**dealMembershipDetail**: dealMembershipDetail() 提供边缘节点的成员资格详细信息，在删除最近删除的设备的成员资格详细信息后，提供与边缘节点关联的设备的信息。
   - eventbus 模块接收到达 MQTT Topic 的消息，然后将该消息转发到 DeviceTwin 控制器，后者进一步将其转发到 Membership 模块.
   - Membership 模块添加消息中提到的设备，删除缓存中不存在的设备。
   - 更新设备详细信息后，一条消息将发送至 Communication 模块。

  ![Membership Detail](/img/devicetwin/membership-detail.png)


### Twin 模块

Twin 模块的主要职责是处理所有 DeviceTwin 相关的操作。它可以执行更新 DeviceTwin、DeviceTwin 获取和 DeviceTwin 同步到云端等操作。

该模块的主要功能有：

1. 初始化操作回调映射（这是 action（string）到执行请求操作的回调函数的映射）
2. 接收发送到 Twin 模块的消息
3. 对于每条消息，都会读取操作消息并调用相应的函数
4. 从心跳通道接收心跳并向控制器发送心跳

以下是 Twin 模块可以执行的操作：

   - dealTwinUpdate
   - dealTwinGet
   - dealTwinSync

**dealTwinUpdate**: dealTwinUpdate() 进行特定设备的 DeviceTwin 信息更新。
- DeviceTwin 更新消息可以由 Edgehub 模块从云端接收，也可以通过 eventbus 组件从 MQTT 代理接收（映射器将在 DeviceTwin 更新 topic 上发布消息）。
- 然后，该消息被发送到 DeviceTwin 控制器，从那里它被发送到 DeviceTwin 模块。
- Twin 模块更新数据库中的孪生值，并将更新结果消息发送至 Communication 模块。
- Communication 模块将依次通过事件总线将发布消息发送到 MQTT 代理。

  ![Device Twin Update](/img/devicetwin/devicetwin-update.png)


**dealTwinGet**: dealTwinGet() 进行特定设备的 DeviceTwin 信息获取。
  - eventbus 组件接收到达订阅的 twin get 主题的消息，并将该消息转发到 devicetwin 控制器，devicetwin 控制器进一步将消息发送到 twin 模块。
  - twin 模块获取特定设备的 devicetwin 相关信息并将其发送到 Communication 模块，它还处理未找到设备或发生任何内部问题时出现的错误。
  - Communication 模块将通过 eventbus 将发布消息依次发送 MQTT 代理。

  ![Device Twin Get](/img/devicetwin/devicetwin-get.png)


**dealTwinSync**: dealTwinSync() 进行特定设备的 DeviceTwin 信息同步。
  - eventbus 模块接收有关订阅的 Twin 同步主题的消息。
  - 然后，该消息被发送到 devicetwin 控制器，从那里它被发送到 Twin 模块。
  - 然后，Twin 模块同步数据库中存在的 Twin 信息，并将同步的 Twin 结果发送到 Communication 模块。
  - Communication 模块进一步将信息发送到 edgehub 组件，而 edgehub 组件又通过 websocket 连接将更新发送到云端。
  - 该函数还执行一些操作，例如通过 Communication 模块将更新的孪生详细信息文档、DeviceTwin 的增量以及更新结果（如果出现错误）发布到指定 topic，该主题将数据发送到 edgehub，edgehub将其发送到 eventbus ，eventbus 再从 MQTT代理上发布。

  ![Sync to Cloud](/img/devicetwin/sync-to-cloud.png)

### Communication 模块

Comunication 模块的主要职责是确保 DeviceTwin 与其他组件之间的通信功能。

该模块的主要功能是：

1. 初始化动作回调映射，它是一个包含可以执行的回调函数的 map[string]Callback
2. 接收发送至 Communication 模块的消息
3. 对于每条消息，都会读取操作消息并调用相应的函数
4. 确认消息中指定的操作是否完成，如果操作未完成则重做该操作
5. 从心跳通道接收心跳并向控制器发送心跳

以下是该模块可以执行的操作回调：

   - dealSendToCloud
   - dealSendToEdge
   - dealLifeCycle
   - dealConfirm


**dealSendToCloud**: dealSendToCloud() 用于将数据发送到 cloudHub 组件。该函数首先确保云端已连接，然后将消息发送到 edgeHub 模块（通过 beehive 框架），edgeHub 模块又将消息转发到云端（通过 websocket 连接）。

**dealSendToEdge**:  dealSendToEdge() 用于将数据发送到边缘处的其他模块。该函数使用 beehive 框架将收到的消息发送到 edgeHub 模块。EdgeHub 模块收到消息后会将其发送给所需的接收者。

**dealLifeCycle**:   dealLifeCycle() 检查云是否已连接并且孪生的状态是否已断开连接，然后将状态更改为已连接并将节点详细信息发送到 edgehub。如果云随后断开连接，则会将孪生的状态设置为断开连接。

**dealConfirm**:     dealConfirm() 用于确认事件。它检查消息的类型是否正确，然后从确认映射中删除该 id。


### Device 模块

Device 模块的主要职责是执行设备相关操作，例如处理设备状态更新和设备属性更新。

该模块执行的主要功能是：

1. 初始化操作回调映射（这是 action（string）到执行请求操作的回调函数的映射）
2. 接收发送到 Device 模块的消息
3. 对于每条消息，都会读取操作消息并调用相应的函数
4. 从心跳通道接收心跳并向控制器发送心跳

以下是该模块可以执行的操作回调：

   - dealDeviceUpdated
   - dealDeviceStateUpdate

 **dealDeviceUpdated**: dealDeviceUpdated() 处理遇到设备属性更新时要执行的操作。它更新对设备属性的更改，例如数据库中属性的添加、属性更新和属性删除。它还将要发布的设备属性更新的结果发送到事件总线组件。

   - 设备属性更新是从云端发起的，云端将更新发送到edgehub。
   - Edgehub 组件将消息发送到 DeviceTwin 控制器，控制器将消息转发到设备模块。
   - Device 模块将设备属性详细信息更新到数据库中，之后 Device 模块将设备属性更新的结果通过 Communication 模块发送到 eventbus 组件进行发布。 eventbus 组件进一步在指定 topic 上发送结果。

  ![Device Update](/img/devicetwin/device-update.png)

 **dealDeviceStateUpdate**:  dealDeviceStateUpdate()处理遇到设备状态更新时要执行的操作。它应用了对设备属性的更改，例如数据库中属性的添加、属性更新和属性删除。它还将要发布的设备属性更新的结果发送到 EventBus 组件。


   - 设备状态更新是通过在 eventbus 组件订阅的指定 topic 上发布消息来启动的。
   - eventbus 组件将消息发送到 DeviceTwin 控制器，控制器将消息转发到 Device 模块。
   - Device 模块更新数据库中设备的状态以及设备的最后在线时间。
   - Device 模块将设备状态更新的结果通过 devicetwin 的 communication 模块发送给 eventbus 组件和 edgehub 组件。 eventbus 组件进一步在指定 topic 上的发布结果，与此同时 edgehub 组件将设备状态更新发送到云端。

  ![Device State Update](/img/devicetwin/device-state-update.png)


## 数据表

DeviceTwin 模块在数据库中创建三个表，分别是：

   - Device Table：设备表
   - Device Attribute Table：设备属性表
   - Device Twin Table：DeviceTwin 属性表


### 设备表

设备表包含有关添加到特定边缘节点的设备的数据。以下是设备表中存在的列：

|列名 | 描述 |
|---|---|
| **ID** |  该字段表示分配给设备的ID |
| **Name** | 该字段表示设备的名称 |
| **Description** | 该字段表示设备的描述信息 |
| **State** | 该字段表示设备的状态 |
| **LastOnline** | 该字段表示设备上次在线的时间 |

**可执行的操作：**

以下是可以对此数据执行的操作：

- **Save Device**: 在设备表中插入设备

- **Delete Device By ID**: 按 ID 从设备表中删除设备

- **Update Device Field**: 更新设备表中的单个字段

- **Update Device Fields**: 更新设备表中的多个字段

- **Query Device**: 从设备表中查询设备

- **Query Device All**: 显示设备表中存在的所有设备

- **Update Device Multi**: 更新设备表中多个设备的多列

- **Add Device Trans**: 在单个事务中插入设备、设备属性和 DeviceTwin，如果其中任何操作失败，则会回滚其他插入

- **Delete Device Trans**: 在单个事务中删除设备、设备属性和 DeviceTwin，如果其中任何操作失败，则会回滚其他删除操作


### 设备属性表

设备属性表包含有关与边缘节点中的特定设备关联的设备属性的数据。以下是设备属性表中存在的列：

| 列名 | 描述 |
|----------------|--------------------------|
| **ID** |  该字段表示分配给设备属性的id |
| **DeviceID** |  该字段表示与该属性关联的设备的设备ID |
| **Name** | 该字段表示设备属性的名称 |
| **Description** | 该字段表示设备属性的描述 |
| **Value** | 该字段表示设备属性的值 |
| **Optional** | 该字段指示设备属性是否可选 |
| **AttrType** | 该字段指示所引用的属性的类型 |
| **Metadata** |该字段描述与设备属性关联的元数据  |


**可执行的操作**

以下是可以对此数据表执行的操作：

   - **Save Device Attr**: 在设备属性表中插入设备属性

   - **Delete Device Attr By ID**: 从设备属性表中按 ID 删除设备属性

   - **Delete Device Attr**: 通过根据设备 id 和设备名称进行过滤，从设备属性表中删除设备属性

   - **Update Device Attr Field**: 更新设备属性表中的单个字段

   - **Update Device Attr Multi Fields**: 更新设备属性表中的多个字段

   - **Query Device Attr**: 从设备属性表中查询设备属性

   - **Update Device Attr Multi**: 更新设备属性表中多个设备属性的多列

   - **Delete Device Attr Trans**: 在单个事务中插入设备属性、删除设备属性和更新设备属性。


### DeviceTwin 数据表

DeviceTwin 数据表包含与边缘节点中的特定设备关联的 DeviceTwin 相关的数据。以下是 DeviceTwin 数据表中存在的列：


| 列名 | 描述 |
|---|---|
| **ID** | 该字段表示分配给 DeviceTwin 的 ID |
| **DeviceID** |  该字段指示与该 DeviceTwin 关联的设备的设备 ID |
| **Name** | 该字段表示 DeviceTwin 的名称 |
| **Description** | 该字段表示 DeviceTwin 的描述 |
| **Expected** | 该字段表示设备的期望值 |
| **Actual** | 该字段表示设备的实际值 |
| **ExpectedMeta** | 该字段指示与设备的期望值相关的元数据 |
| **ActualMeta** | 该字段表示与设备实际值相关的元数据 |
| **ExpectedVersion** | 该字段表示设备期望值的版本 |
| **ActualVersion** | 该字段表示设备实际值的版本 |
| **Optional** | 该字段指示 DeviceTwin 是否可选 |
| **AttrType** | 该字段指示所引用的属性的类型 |
| **Metadata** | 该字段描述与 DeviceTwin 关联的元数据 |


**可执行的操作**

以下是可以对此数据表执行的操作：

   - **Save Device Twin**: 在 DeviceTwin 数据表中新增数据

   - **Delete Device Twin By Device ID**: 按 ID 从 DeviceTwin 数据表中删除数据

   - **Delete Device Twin**: 通过根据设备 ID 和设备名称进行过滤，从 DeviceTwin 数据表中删除数据

   - **Update Device Twin Field**: 更新 DeviceTwin 数据表中的单个字段

   - **Update Device Twin Fields**: 更新 DeviceTwin 数据表中的多个字段

   - **Query Device Twin**: 从 DeviceTwin 数据表中查询数据

   - **Update Device Twin Multi**: 更新 DeviceTwin 表中多列数据
   - **Delete Device Twin Trans**: 在单个事务中插入、删除和更新数据
