import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { from, Observable, Observer } from 'rxjs';
import { ChatMessage } from '../../demo/domain/chat-message';

const apiUrl = 'http://127.0.0.1:5000';

const enum ChatRoomCommand {
  SendMessage = 'SendMessage',
  SetAge = 'SetAge',
  GetAge = 'GetAge',
  SendPrivateMessage = 'SendPrivateMessage'
}

const enum ChatRoomEvent {
  ReceiveMessage = 'ReceiveMessage',
  ReceiveAge = 'ReceiveAge',
  UserOnline = 'UserOnline',
  ReceivePrivateMessage = 'ReceivePrivateMessage'
}

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  connection: HubConnection;

  constructor(private httpClient: HttpClient) {}

  connect(accessToken: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://127.0.0.1:5000/chatHub', {
        accessTokenFactory: () => accessToken
      })
      .build();

    return from(this.connection.start());
  }

  sendMessage(name: string, message: string) {
    this.connection
      .invoke(ChatRoomCommand.SendMessage, name, message)
      .then(_ => console.log('發送成功'));
  }

  receiveMessage(): Observable<ChatMessage> {
    return Observable.create((observer: Observer<ChatMessage>) => {
      this.connection.on(ChatRoomEvent.ReceiveMessage, (name, message) => {
        observer.next({ private: false, name: name, message: message });
      });
    });
  }

  setAge(age: number) {
    this.connection.invoke(ChatRoomCommand.SetAge, age);
  }

  getAge() {
    this.connection.invoke(ChatRoomCommand.GetAge);
  }

  receiveAge() {
    this.connection.on(ChatRoomEvent.ReceiveAge, age => {
      console.log(age);
    });
  }

  receiveOnlineUser() {
    this.connection.on(ChatRoomEvent.UserOnline, (user, userCount) => {
      console.log(user);
    });
  }

  sendPrivateMessage(to: string, message: string) {
    // TODO: 發送訊息給某個使用者，在取得 AccessToken 功能完成後實作
    this.connection.invoke(ChatRoomCommand.SendPrivateMessage, to , message);
  }

  privateMessage(): Observable<ChatMessage> {
    // TODO: 建立接受 PrivateMessage 訊息的事件
    return Observable.create((observer: Observer<ChatMessage>) => {
      this.connection.on(ChatRoomEvent.ReceivePrivateMessage, (fromUser, message) => {
        observer.next({ private: true, name: fromUser, message: message });
      });
    });
  }

  stopReceiveMessage() {
    // TODO: 停止接受 ReceiveMessage
  }

  joinGroup(group: string) {
    // TODO: 加入某個群組
  }

  leaveGroup(group: string) {
    // TODO: 離開某個群組
  }

  sendMessageToGroup(group: string, message: string) {
    // TODO: 針對群組發送訊息
  }

  broadcast(message: string) {
    // TODO: 打 API 來進行廣播
  }

  getAccessToken(user) {
    // TODO: 取得 Access Token
    return this.httpClient.post(`${apiUrl}/Account/Token`, {UserName: user});
  }
}
