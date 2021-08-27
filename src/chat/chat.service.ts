import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  groupChat: any = [
    {
      id: 'message_1',
      groupId: 'group123',
      groupName: 'Super Sunday Party',
      category: 'group',
      access: 'public',
      messages: [
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'lets start',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Hello. Pramod',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Hello. Navin',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Hope you are doing well',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Yeah',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'How r u Navin?',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'I saw u near the park today morning',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Oh I just went for quick walk',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: "From tomorrow I'll join you",
        },
        {
          from: 'sansa1998',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Yeah, sure Pramod',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'I saw u near the park today morning',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Oh I just went for quick walk',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: "From tomorrow I'll join you",
        },
        {
          from: 'sansa1998',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Yeah, sure Pramod',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'I saw u near the park today morning',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Oh I just went for quick walk',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: "From tomorrow I'll join you",
        },
        {
          from: 'sansa1998',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Yeah, sure Pramod',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'I saw u near the park today morning',
        },
        {
          from: 'sansa1998',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Oh I just went for quick walk',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: "From tomorrow I'll join you",
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Yeah, sure Pramod',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'I saw u near the park today morning',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Oh I just went for quick walk',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: "From tomorrow I'll join you",
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Yeah, sure Pramod',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'I saw u near the park today morning',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'Oh I just went for quick walk',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'https://upstox.com/',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'https://twitter.com/youyuxi',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'https://www.whatsapp.com',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message:
            'https://v3.vuejs.org/guide/composition-api-introduction.html#standalone-computed-properties',
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: "From tomorrow I'll join you",
        },
        {
          from: 'pramod456',
          time: 'Tue Aug 17 2021 17:37:51',
          message: 'https://www.facebook.com/ Please like share and subscribe',
        },
        {
          from: 'navin123',
          time: 'Tue Aug 17 2021 17:37:51',
          message:
            'https://www.youtube.com/watch?v=6GA6X8XHE14 Please like share and subscribe',
        },
      ],
    },
  ];

  async findChatGroup(id: string): Promise<any> {
    const result = this.groupChat;
    return result;
  }

  async sendChatGroup(from: string, message: string): Promise<any> {
    this.groupChat[0].messages.push({
      from,
      message,
    });
    return {
      status: HttpStatus.OK,
      data: {
        name: 'Premnath',
        msg: 'sent',
      },
    };
  }

  async msgTyping(id: string): Promise<any> {
    //
  }
}
