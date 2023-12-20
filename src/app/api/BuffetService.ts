// buffetService.ts

import axios from 'axios';
import { API_URL_BUSCABUFFET } from './API_URL';
import HTTP from './http';

interface addCupom {
    codigo: string,
    descricao: string,
    valor: string,
    porcentagem: string,
    data_inicio: string,
    data_fim: string
    id: number,
    dias: number
}

interface addPlan {
    nome: string,
    valor_mensal: string,
    valor_anual: string
}

interface addFunctionalities {
    descricao: string,
    id_plano: number
}

export default class BuffetService {

    //Usuário////////////////////////////////////////////////////////
    static autoLogin() {
      throw new Error("Method not implemented.");
    }
  

    static async createUser(data: {
      nome: string,
      email: string,
      password: string,
  }): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/usuarios`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        return error?.response?.data?.error
      }
    }

    static async loginUser(data: {
      email: string,
      password: string,
    }): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/usuarios/login`;
      return await HTTP.request('POST', url, data);
    }

    static async getUserData(userId: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/usuarios/${userId}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        throw error;
      }
    }
    

    static async logout(): Promise<void> {
      window.localStorage.removeItem('USER_TOKEN');
      window.localStorage.removeItem('USER_ID');
      window.localStorage.removeItem('USERNAME');
      window.location.href = 'https://buscabuffet.com.br';
    }


    /////////////////////////////////////////////////BUFFET///////////////////////////////////

    //Retorna lista com todos o buffets
    static async showBuffets(): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets`;
      return await HTTP.request('GET', url);
    }

    //Retorna o buffet pelo seu id
    static async showBuffetById(buffetId: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets/buffet/${buffetId}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados dos detalhes do Buffet:', error);
        throw error;
      }
    }

    static async showBuffetByIdEntity(buffetId: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets/${buffetId}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados dos detalhes do Buffet:', error);
        throw error;
      }
    }

    static async showUserByIdEntity(userId: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/usuarios/${userId}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados dos detalhes do Buffet:', error);
        throw error;
      }
    }

    static async showUsers(): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/usuarios/`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados dos detalhes do Buffet:', error);
        throw error;
      }
    }



    static async showBuffetsBySlug(slug: string): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets/slug/${slug}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados do buffet pelo slug:', error);
        throw error;
      }
    }

    static async showBuffetsBySearch(search: string): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets?q=${search}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados do buffet pelo slug:', error);
        throw error;
      }
    }

    static async showDetailsBuffetById(buffetId: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets/detalhes/${buffetId}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados dos detalhes do Buffet:', error);
        throw error;
      }
    }

    

    static async createBuffets(data: 
      {
        id_entidade: number,
        slug: string,
        capacidade_total: number,
        area_total: string,
        horario_atendimento: string,
        horario_atendimento_fds: string,
        sobre: string,
        youtube: string,
        status: string,
        redes_sociais: {
          descricao: string,
          tipo: string
        }[]
        
      }): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar dados do usuário:', error);
        throw error;
      }
    }

    static async editBuffets(id: number, data: 
      {
        slug: string,
        capacidade_total: number,
        area_total: string,
        horario_atendimento: string,
        horario_atendimento_fds: string,
        sobre: string,
        youtube: string,
        status: string,
        data_cadastro?: any,
        data_fim?: any,
        redes_sociais: {
          descricao: string,
          tipo: string
        }[]
      }): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets/${id}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar dados do usuário:', error);
        throw error;
      }
    }

    static async editUser(userId, data): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/usuarios/${userId}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar dados do usuário:', error);
        throw error;
      }
    }



    static async editAttractionsServicesBuffets(id: number, data): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets/detalhes/${id}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar atrações e serviçoes do buffet:', error);
        throw error;
      }
    }

    static async getServicesBuffetsById(id: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/servicos/${id}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url,{
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar atrações e serviçoes do buffet:', error);
        throw error;
      }
    }

    static async getSecuritiesBuffetsById(id: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/segurancas/${id}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url,{
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar atrações e serviçoes do buffet:', error);
        throw error;
      }
    }


    static async getAttractionsBuffetsById(id: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/atracoes/${id}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url,{
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar atrações e serviçoes do buffet:', error);
        throw error;
      }
    }

    static async getCategoriesBuffetsById(id: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/categorias/entidade/${id}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url,{
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar categorias do buffet:', error);
        throw error;
      }
    }

    static async postAttractionsServicesBuffets(data): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets/detalhes`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar atrações e serviçoes do buffet:', error);
        throw error;
      }
    }

    static async deleteAttractionsServicesBuffets(id_buffet): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/buffets/${id_buffet}/detalhes`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar atrações e serviçoes do buffet:', error);
        throw error;
      }
    }

    static async deleteCategoriesBuffets(id_buffet): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/categorias/entidade/${id_buffet}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar atrações e serviçoes do buffet:', error);
        throw error;
      }
    }



    static async deleteFiles(id_file): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/arquivos/${id_file}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar atrações e serviçoes do buffet:', error);
        throw error;
      }
    }
    static async createAddressBuffets(idBuffet: number, data): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/enderecos/${idBuffet}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao criar endereço para buffet:', error);
        throw error;
      }
    }

    static async editAddressBuffets(idBuffet: number, data): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/enderecos/${idBuffet}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao editar endereço do buffet:', error);
        throw error;
      }
    }


    static async showCitiesByIdState(idState: number, ): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/enderecos/estados/${idState}/cidades`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar cidades dos estados por id do estado:', error);
        throw error;
      }
    }

    static async showStatesBd(): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/enderecos/estados`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar estados cadastrados no banco de dados:', error);
        throw error;
      }
    }





    
  
    //////////////////////////////////////ATRAÇÕES///////////////////////////////////////////////////////
    //Retornar as atrações cadastradas no banco
    static async showAttractionBuffets(): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/atracoes`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar atrações do usuário:', error);
        throw error;
      }
    }


    
    //////////////////////////////////////////SERVIÇOS////////////////////////////////////////////////////////
    //Retornar os serviços cadastrados no banco
    static async showServicesBuffets(): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/servicos`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar serviços do usuário:', error);
        throw error;
      }
    }

    static async showSecurityBuffets(): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/segurancas`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar serviços do usuário:', error);
        throw error;
      }
    }


    //Cupons///////////////////////////////////////////////////////////////////
  
    static async showCupoms(): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/cupons`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar os cupons:', error);
        throw error;
      }
    }
  
    static async addCupom(data: addCupom): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/cupons`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
  
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        return response.data;
      } catch (error) {
        console.error('Erro ao fazer o POST do cupom:', error);
        throw error;
      }
    }

    static async editCupom(data: addCupom, index: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/cupons/${index}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
  
      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        return response.data;
      } catch (error) {
        console.error('Erro ao editar o cupom:', error);
        throw error;
      }
    }

    static async deleteCupom(id: number): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/cupons/${id}`;
      const bearerToken = localStorage.getItem('USER_TOKEN');
  
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
  
        return response.data;
      } catch (error) {
        console.error('Erro ao editar o cupom:', error);
        throw error;
      }
    }
  

    static async showPlans(): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/planos`;
      return await HTTP.request('GET', url);
  }
 
  static async addPlan(data: addPlan): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/planos/`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao postar plano:', error);
      throw error;
    }
  }

 
  static async editPlan(data: addPlan, index: number): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/planos/${index}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    try {
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao editar plano:', error);
      throw error;
    }
  }


  static async createFunctionalities(data: addFunctionalities): Promise<any> {
      const url = `${API_URL_BUSCABUFFET}/planos/funcionalidades`;
      return await HTTP.request('POST', url, data);
  }


  
  static async showOneUser(index: number): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/usuarios/${index}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quantidade de assinaturas:', error);
      throw error;
    }
  }
  /*static async editUser(data: any, index: number) {
      const url = `${API_URL_BUSCABUFFET}/usuarios/${index}`
      return await HTTP.request('PUT', url, data);
  }*/

  static async showAssessment() {
      const url = `${API_URL_BUSCABUFFET}/buffets`
      return await HTTP.request('GET', url);
  }

 
  static async showSignatures(): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/assinaturas`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quantidade de assinaturas:', error);
      throw error;
    }
  }

  static async showSignaturesById(id): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/assinaturas/${id}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quantidade de assinaturas:', error);
      throw error;
    }
  }
 
 

  static async totalUsers(): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/usuarios/total`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quantidade de usuários:', error);
      throw error;
    }
  }

  static async totalEvents(): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/eventos/total`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quantidade de eventos:', error);
      throw error;
    }
  }

  static async totalProposal(): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/propostas/total`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quantidade de propostas:', error);
      throw error;
    }
  }


  static async totalBuffets(): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/buffets`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quantidade de buffets:', error);
      throw error;
    }
  }



  //Galeria Do Buffet ////////////////////////////////////////////////////////////////

  static async postFileBuffetImageOne(data) {
    const url = `${API_URL_BUSCABUFFET}/arquivos`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

   
    const formData = new FormData();
    formData.append('nome', data?.selectedImageOne?.name);
    formData.append('tipo', "capa");
    formData.append('anexo', data?.selectedImageOne);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o upload da galeria do buffet:', error);
      throw error;
    }
  }

  static async postFileBuffet(imageFile) {
    const url = `${API_URL_BUSCABUFFET}/arquivos`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    const formData = new FormData();
    formData.append('nome', imageFile?.name);
    formData.append('anexo', imageFile);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o upload da galeria do buffet:', error);
      throw error;
    }
  }

  static async postFileBuffetImageTwo(data) {
    const url = `${API_URL_BUSCABUFFET}/arquivos`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    
    const formData = new FormData();
    formData.append('nome', data?.selectedImageTwo?.name);
    formData.append('tipo', "card");
    formData.append('anexo', data?.selectedImageTwo);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o upload da galeria do buffet:', error);
      throw error;
    }
  }

  static async postFileBuffetImageThree(data) {
    const url = `${API_URL_BUSCABUFFET}/arquivos`;
    const bearerToken = localStorage.getItem('USER_TOKEN');


    const formData = new FormData();
    formData.append('nome', data?.imageFile?.name);
    formData.append('tipo', "galeria");
    formData.append('anexo', data?.imageFile);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o upload da galeria do buffet:', error);
      throw error;
    }
  }

  static async editFileBuffet(imageFile, idFile) {
    const url = `${API_URL_BUSCABUFFET}/arquivos/${idFile}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    const formData = new FormData();
    formData.append('nome', imageFile?.name);
    formData.append('anexo', imageFile);

    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o upload da galeria do buffet:', error);
      throw error;
    }
  }

  static async postGaleryBuffet(data:{
    id_buffet: number,
    id_arquivo: number,
  }) {
    const url = `${API_URL_BUSCABUFFET}/buffet/galerias`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o upload da galeria do buffet:', error);
      throw error;
    }
  }



  static async postGalleryBuffet(idUser, data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/buffets/galerias`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.post(url, {
        id_buffet: idUser,
        id_arquivo: data
      }, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao criar galeria para o Buffet.', error);
      throw error;
    }
  }

  static async EditGalleryBuffet(idUser): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/arquivos/${idUser}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.put(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar galeria para o Buffet.', error);
      throw error;
    }
  }

  static async getImagesGallery(idUser): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/buffets/galerias/${idUser}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atrações do usuário:', error);
      throw error;
    }
  }

  static async getCategoriasBuffet(): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/categorias`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atrações do usuário:', error);
      throw error;
    }
  }

  static async showCategoriesBuffetById(id_buffet): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/categorias/entidade/${id_buffet}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar categorias do usuário:', error);
      throw error;
    }
  }



  static async postCategoriaBuffet(data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/buffets/categorias`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.post(url,    data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
    
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atrações do usuário:', error);
      throw error;
    }
  }

  static async putCategoriaBuffet(id, data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/buffets/categorias/${id}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.put(url,    data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
    
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atrações do usuário:', error);
      throw error;
    }
  }

  //Detalhes do Buffet 


  //Endereços dos buffets
  static async getAddressBuffets(idBuffet): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/enderecos/${idBuffet}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereços do bufet:', error);
      throw error;
    }
  }



  //// ADITIONAL FUNCIONALITIES
  static async showStates() {
    const url = 'https://buscabuffet.com.br/api/enderecos/estados';
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      throw error;
    }
  }

  static async getCitiesByState(stateId) {
    const baseUrl = `https://buscabuffet.com.br/api/enderecos/estados/${stateId}/cidades`;


    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar municípios do estado ${stateId}:`, error);
      throw error;
    }
  }

  static async getNeighborhoodsByCityId(cityId) {
    const url = `https://sua-api-de-bairros.com/api/cidades/${cityId}/bairros`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar bairros da cidade ${cityId}:`, error);
      throw error;
    }
  }


  //API CORREIOS - RETORNA O ENDEREÇO PELO CEP
  static async getAddressByCEP(cep) {
    const baseUrl = 'https://viacep.com.br/ws/';

    try {
      const response = await axios.get(`${baseUrl}${cep}/json`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereço por CEP:', error);
      throw error;
    }
  }


    ////////////////////////////////////EVENTOS/////////////////////////////////////////
  static async showEventsByIdEntity(id_entidade): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/eventos/entidade/${id_entidade}`;
    return await HTTP.request('GET', url);
  }

  static async showEventsByStatus(id_entidade): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/eventos/entidade/status/${id_entidade}`;
    return await HTTP.request('GET', url);
  }

  static async showBudgetsByIdEntity(id_entidade): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/propostas/${id_entidade}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereços do bufet:', error);
      throw error;
    }
  }

  static async showBudgetsById(id_evento): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/propostas/${id_evento}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereços do bufet:', error);
      throw error;
    }
  }

  static async showBudgetsByStatus(id_entidade): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/propostas/status/${id_entidade}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereços do bufet:', error);
      throw error;
    }
  }



  static async showEventsById(idEvent: number): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/eventos/${idEvent}`;
    return await HTTP.request('GET', url);
  }



  /////////////////////////////////////// PROPOSTAS ////////////////////////////////////////
  static async sendProposta(data:{
    nome: string,
    observacoes: string,
    valor: number,
    status: any,
    id_entidade: number,
    id_evento: number,
    id_arquivo: number,
    data_disponibilidade: string
  }) {
    const url = `${API_URL_BUSCABUFFET}/propostas`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    try {
      const response = await axios.post(url, data, {
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

  /////////////////////////////////////// PROPOSTAS ////////////////////////////////////////
  static async sendEvento(data) {
    const url = `${API_URL_BUSCABUFFET}/eventos`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    try {
      const response = await axios.post(url, data, {
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

  static async deleteEvento(id: number) {
    const url = `${API_URL_BUSCABUFFET}/eventos/${id}`;
    const bearerToken = localStorage.getItem('USER_TOKEN');

    try {
      const response = await axios.delete(url, {
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

  ///Recuperação de senha
  static async recoveryPassword(data): Promise<any> {
    const url = `${API_URL_BUSCABUFFET}/usuarios/recovery`;
    const bearerToken = localStorage.getItem('USER_TOKEN');
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao tentar recuperar a senha:', error);
      throw error;
    }
  }








}


