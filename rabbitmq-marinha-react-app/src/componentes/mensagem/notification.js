import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const Erro = (titulo, mensagem, tempo = 5000) => {
  NotificationManager.error(mensagem,titulo,tempo)
}

export const Alerta = (titulo, mensagem, tempo = 5000) => {
  NotificationManager.warning(mensagem,titulo,tempo)
}
export const Sucesso = (titulo, mensagem, tempo = 5000) => {
  NotificationManager.success(mensagem,titulo,tempo)
}
export const Info = (titulo, mensagem, tempo = 5000) => {
  NotificationManager.info(mensagem,titulo,tempo)
}