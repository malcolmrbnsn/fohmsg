# fohmsg

## resources

error codes:
- https://www.rfc-editor.org/rfc/rfc6455.html#section-7.4.1


## current func
- asynchronus chat
    - one chatroom, one input per user
- connection, active reconnects
- active user list
- simple usernames, last edited

todo
- reconnect + login state properly



### stages

stage 1
- basic websocket setup
- implement reconnection resync, showlog
- simple ui, one chatroom with keypress sync
- basic clear screen func
- usernames :)

- buttons working
- hike state
    - client reconnection + server
    - fetching on connection



stage 2
- clear screen
- reactions


stage 3
- admin settings
- tiling windows
- groups
- nosleep etc?

stage 4
- mobile :o
- host node
- autodiscover
- federation ?


### tech

message types
- chat
- log
- connection
    - same sorta buttons as radio a1a2 etc
    - can be set by admin, overrides client (adv)


message data
- groups
- reactions (recieved, yes/no)
- effects
    - clear screen (clear textbox, push to history)
    - flash
    - expiring ?
    - repeat ?

live text
- 5 sec or so timeout before new textbox
- new textbox 
- textbox per user is easy


groups
- priority
- group name
- id to rename
- read only, edit
emergency messages

window types
- stay on top
    - easy with native
- web browser for poc

federation, connected nodes
- intergroups (read, write per host groups)
- retransmit intergroup announcements 
- hierachy???
emergancy messages


whisper ??

admin/server alerts
- disconnect
- new connection
- new user
- prioirty message
- emergancy messages