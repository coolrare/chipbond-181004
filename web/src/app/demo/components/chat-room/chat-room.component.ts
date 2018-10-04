import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../core/services/chat-room.service';
import { ChatMessage } from '../../domain/chat-message';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  name: string;
  token: string;
  message: string;
  broadcast: string;
  toUser: string;
  connected = false;
  messages: ChatMessage[] = [];
  group: string;
  groupJoined: boolean;

  constructor(private chatRoomService: ChatRoomService) {}
  ngOnInit() {}

  connect() {
    this.chatRoomService.connect(this.token).subscribe(() => {
      console.log('連線成功');
      this.chatRoomService.receiveMessage().subscribe(message => {
        this.messages.push(message);
      });

      this.chatRoomService.privateMessage().subscribe(message => {
        this.messages.push(message);
      });

      this.chatRoomService.setAge(18);
      this.chatRoomService.receiveAge();
      this.chatRoomService.getAge();

      this.chatRoomService.receiveOnlineUser();
    });
  }

  chat(input: HTMLInputElement) {
    if (this.toUser) {
      this.chatRoomService.sendPrivateMessage(this.toUser, input.value);
    } else if (this.groupJoined) {
      this.chatRoomService.sendMessageToGroup(this.group, input.value);
    } else {
      this.chatRoomService.sendMessage(this.name, input.value);
    }
    input.value = '';
    input.focus();
  }

  sendBroadcast(input: HTMLInputElement) {
    this.chatRoomService.broadcast(input.value).subscribe();
  }

  joinGroup() {
    if (this.groupJoined) {
      this.chatRoomService.leaveGroup(this.group);
    } else {
      this.chatRoomService.joinGroup(this.group);
    }
    this.groupJoined = !this.groupJoined;
  }

  getToken() {
    this.chatRoomService.getAccessToken(this.name).subscribe((token: any) => {
      console.log(token);
      this.token = token.token;
    });
  }
}
