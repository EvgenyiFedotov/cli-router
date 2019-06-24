# [sampi](https://github.com/EvgenyiFedotov/cli-router#readme) *0.1.0*



### src/core/common/templates.js


#### createTemplate(nameModule, nameTemplate, files) 

Create template




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| nameModule | `string`  |  | &nbsp; |
| nameTemplate | `string`  |  | &nbsp; |
| files | `Array.<string>`  |  | &nbsp; |




##### Returns


- `Promise.&lt;undefined&gt;`  



#### deleteTemplate(nameModule, nameTemplate) 

Delete template




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| nameModule | `string`  |  | &nbsp; |
| nameTemplate | `string`  |  | &nbsp; |




##### Returns


- `Promise.&lt;undefined&gt;`  



#### runTemplate(nameModule, nameTemplate) 

Run template




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| nameModule | `string`  |  | &nbsp; |
| nameTemplate | `string`  |  | &nbsp; |




##### Returns


- `Promise.&lt;undefined&gt;`  



#### getListTemplates(nameModule) 

Get list templates




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| nameModule | `string`  |  | &nbsp; |




##### Returns


- `Array.&lt;string&gt;`  List templates in module



#### createApiTemplates(nameModule) 

Create api by nameModule




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| nameModule | `string`  |  | &nbsp; |




##### Returns


- `Void`




### src/core/common/modules.js


#### existModulesJson(path) 

Check exist `modules.json`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  |  | &nbsp; |




##### Returns


- `Promise.&lt;boolean&gt;`  



#### createModulesJson(path) 

Create `modules.json




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  |  | &nbsp; |




##### Returns


-  



#### addModule(pathModuleJson, nameModule, pathModule) 

Add module in list modules




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pathModuleJson | `string`  |  | &nbsp; |
| nameModule | `string`  |  | &nbsp; |
| pathModule | `string`  |  | &nbsp; |
| configModule.templates | `Object.<string, {  }>`  |  | *Optional* |




##### Returns


- `Promise.&lt;boolean&gt;`  



#### deleteModule(pathModuleJson, nameModule) 

Delete module from `modules.json`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pathModuleJson | `string`  |  | &nbsp; |
| nameModule | `String`  |  | &nbsp; |




##### Returns


- `Promise.&lt;boolean&gt;`  



#### getPathModule(pathModuleJson, nameModule) 

Get path to module




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pathModuleJson | `string`  |  | &nbsp; |
| nameModule | `String`  |  | &nbsp; |




##### Returns


- `string`  



#### getListModules(pathModuleJson) 

Get list modules




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pathModuleJson | `string`  |  | &nbsp; |




##### Returns


- `Array.&lt;string&gt;`  



#### createApiModulesJson(path) 

Bind path to `module.json`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `sting`  |  | &nbsp; |




##### Returns


- `Void`




### src/core/common/files.js


#### createDir(path) 

Create directory




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  | - Path to create directory | &nbsp; |




##### Returns


-  



#### createDirRecurs(path, prefix) 

Create directory recursively




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  | - Path to create directory | &nbsp; |
| prefix | `string`  | - Prefix for gives correct path | &nbsp; |




##### Returns


-  



#### cloneFile(pathFrom, pathTo[, callback]) 

Clone file from -> to




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pathFrom | `string`  | - Path from clone | &nbsp; |
| pathTo | `string`  | - Path to clone | &nbsp; |
| callback | `CallbackCloneFile`  | - Callback for replace content file (maybe by chunks) | *Optional* |




##### Returns


-  



#### cloneDir(pathFrom, pathTo[, callback]) 

Clone directory from -> to




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pathFrom | `string`  | - Path from | &nbsp; |
| pathTo | `string`  | - Path to | &nbsp; |
| callback | `CallbackCloneFile`  | - Callback for replace content file (maybe by chunks) | *Optional* |




##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
