require('dotenv').config();
import axios from 'axios';
import { API_URL_BUSCABUFFET } from './API_URL';

const apiPagBankKey = '624FD1BF878B4199BD44ED22F44C319C'

export default class PagBankService {

  static async showPlans(): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagbank`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados dos planos:', error);
      throw error;
    }
  }

  static async getPlansPagBank() {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=plans`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o upload da galeria do buffet:', error);
      throw error;
    }
  }

  static async getOrderByIdPagBank() {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=orders`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao consultar o pedido do  buffet:', error);
      throw error;
    }
  }

  static async createCustomerAndSubscription({ data }): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=subscriptions`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return error;
    }
  }
  
  
  static async createSignature(data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=subscriptions`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao vincular assinante com plano:', error);
      throw error;
    }
  }

  
  static async getCustomerPagBankById(id): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=customers/${id}`;
    try {
      const response = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao vincular assinante com plano:', error);
      throw error;
    }
  }

  static async getSignaturesPagBankById(id): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=subscriptions/${id}`;
    try {
      const response = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao vincular assinante com plano:', error);
      throw error;
    }
  }

  static async editCustomerPagBankById(id, data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=customers/${id}`;
    try {
      const response = await axios.put(url, data,{
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao editar dados cadastrais do assinante:', error);
      throw error;
    }
  }


  //Suspender assinatura
  static async suspendSignaturePagBankById(id, data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=subscriptions/${id}/suspend`;
    try {
      const response = await axios.put(url, data,{
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao suspender assinante com plano:', error);
      throw error;
    }
  }


  //Cancelar assinatura
  static async cancelSignaturePagBankById(id): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=subscriptions/${id}/cancel`;
    try {
      const response = await axios.put(url,{
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao cancelar assinante com plano:', error);
      throw error;
    }
  }

  
  //Alterar assinatura
  static async editSignaturePagBankById(id, data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=subscriptions/${id}`;
    try {
      const response = await axios.put(url, data,{
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao suspender assinante com plano:', error);
      throw error;
    }
  }

  //Alterar dados de pagamento do usuário //Card Credit
  static async editPaymentPagBankById(id, data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/pagamentos/pagbank?resource=customers/${id}/billing_info`;
    try {
      const response = await axios.put(url, data,{
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao editar assinante com plano:', error);
      throw error;
    }
  }






  ////Relacionado a api do buffet///
  static async createSignatureInBuffet(data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/assinaturas`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao criar assinatura para o usuário:', error);
      throw error;
    }
  }

 

   ////Relacionado a api do buffet///
   static async editSignatureInBuffet(data, id_entidade): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/assinaturas/${id_entidade}`;
    try {
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${apiPagBankKey}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao criar assinatura para o usuário:', error);
      throw error;
    }
  }


   
}


