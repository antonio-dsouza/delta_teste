export async function fetchAddressByPostalCode(postalCode: string) {
    try {
      const cleanedPostalCode = postalCode.replace('-', '');
      
      const response = await fetch(`https://viacep.com.br/ws/${cleanedPostalCode}/json/`);
      const data = await response.json();
  
      if (data.erro) {
        throw new Error("CEP inválido");
      }
  
      return {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        complement: data.complemento || "",
      };
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      throw error;
    }
  };
  