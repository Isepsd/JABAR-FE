interface IFasopTelegramBot {
  id_telegram_bot: number,
  nama: string;
  chat_code: string;
  status: number;
  datum_created?: string;
}

export const FasopTelegramBotField = {
  id_telegram_bot: undefined,
  nama: '',
  chat_code: '',
  status: 0,
  datum_created: '',
};

export type { IFasopTelegramBot };
