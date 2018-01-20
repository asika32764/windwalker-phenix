# EXPERIMENTAL. 

This is an experiment in "borrowing" the ER file format to enhance Phoenix scaffolding capability. The ER file format is a plain text description of entities, their attributes, and relationships found in this excellent ERD Generation tool: https://github.com/BurntSushi/erd . 

The end goal is to be able to take an ER file, and use it as an input file for Phoenix to use as a starting point when building scaffolding for migrations, forms, fields, etc. 

## self imposed constraints
- Maintain compatibility with BurntSush/erd :  must be able to use a file for both ERD generation and scaffolding

# BurntSushi/erd file format
The BurntSushi/erd tool will take a plaintext ER file and generate a diagram such as this:
 
[![ER diagram for nfldb](http://burntsushi.net/stuff/erd/example-nfldb.png)](http://burntsushi.net/stuff/erd/example-nfldb.pdf)

The [corresponding `er` file is in the `examples` 
directory](https://github.com/BurntSushi/erd/blob/master/examples/nfldb.er).

```
# Entities
[player] {bgcolor: "#d0e0d0"}
*player_id {label: "varchar, not null"}
full_name {label: "varchar, null"}
team {label: "varchar, not null"}
position {label: "player_pos, not null"}
status {label: "player_status, not null"}

[team] {bgcolor: "#d0e0d0"}
*team_id {label: "varchar, not null"}
city {label: "varchar, not null"}
name {label: "varchar, not null"}

[game]
etc

# Relationships

player      *--1 team
game        *--1 team {label: "home"}
game        *--1 team {label: "away"}
 ```

if Phoenix is capable of reading Entity Relationship Diagram definition files made for BurntSush/erd

# Phoenix RAD package

Phoenix is a RAD (Rapid Application Development) package for Windwalker, it provides a set of Model, View and Controllers
with different functions to quickly build web admin system, and a code generator to help us create application scaffold.

## Documantation

See http://windwalker.io/rad/

## Features List

- MVC scaffolding
- Advanced controller, mode and view classes.
- Powerful admin template, scripts and tools.
- Grid helper to build sorting, ordering, pagination, search and filter tools.
- Asset Minify
- Data entity auto-complete
- Extends Form Fields
- Easy setup HTML `<head>` and metadata.
- Useful JS scripts integration.
- Uuid generator.

## Screen Shot

### Admin Tools

Grid View:

![p-2016-07-20-004](https://cloud.githubusercontent.com/assets/1639206/16977454/b325aec8-4e88-11e6-915c-42c522479b9f.jpg)

Filter and Search:

![p-2016-07-20-005](https://cloud.githubusercontent.com/assets/1639206/16977558/585e02dc-4e89-11e6-8b8b-816bb4adde90.jpg)

Sorting and Ordering:

![p-2016-07-20-006](https://cloud.githubusercontent.com/assets/1639206/16977589/8f1a54ce-4e89-11e6-99af-0ca3eea3ae38.jpg)

Batch Operation:

![image](https://cloud.githubusercontent.com/assets/1639206/16977619/cd1f9432-4e89-11e6-8fff-906e791e4208.png)

Powerful Form Toolkit

![image](https://cloud.githubusercontent.com/assets/1639206/16977645/f065abac-4e89-11e6-9e8f-9d152d01c0bc.png)

![p-2016-07-20-011](https://cloud.githubusercontent.com/assets/1639206/16977839/2ac6f0b6-4e8b-11e6-8b0f-bec4f71fd295.jpg)

Easily select item from other tables (GIF):

![modal-field](https://cloud.githubusercontent.com/assets/1639206/16977777/b65f40b6-4e8a-11e6-899d-f754edb401df.gif)

Built-in Validation Integrating

![p-2016-07-20-010](https://cloud.githubusercontent.com/assets/1639206/16977817/0901dc0c-4e8b-11e6-96e2-fb949d4fcf30.jpg)

### Simple Scaffold

A simple frontend template to build application:

![p-2016-07-20-012](https://cloud.githubusercontent.com/assets/1639206/16977910/99c79614-4e8b-11e6-9760-4840a37d8526.jpg)

### Empty Scaffold

Pure MVC frame to let you fill your code.

![p-2016-07-20-013](https://cloud.githubusercontent.com/assets/1639206/16978020/3a9314ec-4e8c-11e6-841c-7389ee42360f.jpg)

### Vue Script Includes

![p-2016-07-13-001](https://cloud.githubusercontent.com/assets/1639206/16978046/5f91a830-4e8c-11e6-9184-c39e42dc7041.jpg)


