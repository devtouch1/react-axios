import React, { useEffect, useState } from "react";
import api from "./services/api";
import { debounce } from "lodash";
import SelectComponent from "./SelectComponent";
import './App.css';

export default function App() {
  const [backendData, setBackendData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [position, setPosition] = useState({ x: 200, y: 100, l:0, h:0 });
  const [yoloLabel, setYoloLabel] = useState(null);
  const [lastItemDescription, setLastItemDescription] = useState(null);
  const [lastItemId, setLastItemId] = useState(null);

 

  // Função para atualizar a posição  
  const updatePosition = () => {
  
  if(lastItemDescription==null || yoloLabel==null) return;
  console.log("lastitem")
  console.log("last item: "+lastItemDescription)
  console.log(typeof(lastItemDescription));
  const [classe, xc, yc, ln, an] = yoloLabel.split(' ');
  console.log(yoloLabel);
  console.log({classe, xc, yc, ln, an});
  const image = document.querySelector('.container img');
  const divOverlay = document.querySelector('.overlay');
  const imageRect = image.getBoundingClientRect();

  // Cálculo das coordenadas normalizadas
  const xcNorm = parseFloat(xc);
  const ycNorm = parseFloat(yc);
  const lnNorm = parseFloat(ln);
  const anNorm = parseFloat(an);

  // Cálculo das coordenadas absolutas
  const imageWidth = imageRect.width;
  const imageHeight = imageRect.height;
  const x = imageRect.left + xcNorm * imageWidth - lnNorm * imageWidth / 2;
  const y = imageRect.top + ycNorm * imageHeight - anNorm * imageHeight / 2;
  const largura = lnNorm * imageWidth;
  const altura = anNorm * imageHeight;

  setPosition({ x, y, l: largura, h: altura });
  };

  // Adicionar event listener ao evento resize
useEffect(() => {
  const handleResize = debounce(updatePosition, 500); // Tempo de debounce de 300 milissegundos

  window.addEventListener("resize", handleResize);

  // Limpar o event listener ao desmontar o componente
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  useEffect(() => {
    async function getNumbers() {
      try {
        const res = await fetch(`/api`);
        const data = await res.json();

        // Set the new component state using the data
        console.log(data)
        await setBackendData(data);
      } catch (err) {
        console.log(err);
      }
    }
    getNumbers();
  }, []);

  const convertBufferToBase64 = (buffer) => {
    const base64String = btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:image/jpeg;base64,${base64String}`;
  };

  // Obtém o último elemento da lista
  const lastItem = backendData.length > 0 ? backendData[backendData.length - 1] : null;

  //function que atualiza o lastitem description
  useEffect(() => {
    // Resto do código...

    // Atualiza o estado lastItemDescription quando lastItem é alterado
    if (lastItem) {
      setLastItemDescription(lastItem.description);
      setYoloLabel(lastItemDescription);
      updatePosition();
    }
  }, [lastItem]);

  useEffect(() => {
    // Chama a função updatePosition() sempre que lastItemDescription for atualizado
    if (lastItemDescription && yoloLabel) {
      updatePosition();
    }
  }, [lastItemDescription, yoloLabel]);

  useEffect(()=>{
    if(lastItem)
    setLastItemId(lastItem._id);
  }, [ yoloLabel, lastItem])
  //ENVIA RESPOSTAS
  const handleSelect = async (option) => {
  setSelectedOption(option);

  const selectedOptionIndex = options.findIndex(
    (item) => item.value === option
  );
  const respostas = [selectedOptionIndex];
  if(lastItemId != null){
    console.log(lastItem.respostas)
    respostas.push(...lastItem.respostas);
    const contador = (parseInt(lastItem.contador, 10) + 1).toString();
    console.log(lastItemId)
    let [classe, xc, yc, ln, an] = yoloLabel.split(' ');
    classe = respostas[0];
    const description = `${classe} ${xc} ${yc} ${ln} ${an}`;
  try {
    const response = await axios.post(`/api`, null, {
      params: { respostas, contador, id: lastItemId, description: description },
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
};


  const options = [
  { value: 'R-1', label: 'Parada obrigatória' },
  { value: 'R-2', label: 'Dê a preferência' },
  { value: 'R-3', label: 'Sentido proibido' },
  { value: 'R-4a', label: 'Proibido virar à esquerda' },
  { value: 'R-4b', label: 'Proibido virar à direita' },
  { value: 'R-5a', label: 'Proibido retornar à esquerda' },
  { value: 'R-5b', label: 'Proibido retornar à direita' },
  { value: 'R-6a', label: 'Proibido estacionar' },
  { value: 'R-6b', label: 'Estacionamento regulamentado' },
  { value: 'R-6c', label: 'Proibido parar e estacionar' },
  { value: 'R-7', label: 'Proibido ultrapassar' },
  {
    value: 'R-8a',
    label: 'Proibido mudar de faixa ou pista de trânsito da esquerda para direita'
  },
  {
    value: 'R-8b',
    label: 'Proibido mudar de faixa ou pista de trânsito da direita para esquerda'
  },
  { value: 'R-9', label: 'Proibido trânsito de caminhões' },
  { value: 'R-10', label: 'Proibido trânsito de veículos automotores' },
  {
    value: 'R-11',
    label: 'Proibido trânsito de veículos de tração animal'
  },
  { value: 'R-12', label: 'Proibido trânsito de bicicletas' },
  {
    value: 'R-13',
    label: 'Proibido trânsito de tratores e máquinas de obras'
  },
  { value: 'R-14', label: 'Peso bruto total máximo permitido' },
  { value: 'R-15', label: 'Altura máxima permitida' },
  { value: 'R-16', label: 'Largura máxima permitida' },
  { value: 'R-17', label: 'Peso máximo permitido por eixo' },
  { value: 'R-18', label: 'Comprimento máximo permitido' },
  { value: 'R-19', label: 'Velocidade máxima permitida' },
  { value: 'R-20', label: 'Proibido acionar buzina ou sinal sonoro' },
  { value: 'R-21', label: 'Alfândega' },
  { value: 'R-22', label: 'Uso obrigatório de corrente' },
  { value: 'R-23', label: 'Conserve-se à direita' },
  { value: 'R-24a', label: 'Sentido de circulação da via/pista' },
  { value: 'R-24b', label: 'Passagem obrigatória' },
  { value: 'R-25a', label: 'Vire à esquerda' },
  { value: 'R-25b', label: 'Vire à direita' },
  { value: 'R-25c', label: 'Siga em frente ou à esquerda' },
  { value: 'R-25d', label: 'Siga em frente ou à direita' },
  { value: 'R-26', label: 'Siga em frente' },
  {
    value: 'R-27',
    label: 'Ônibus, caminhões e veículos de grande porte mantenham-se à direita'
  },
  { value: 'R-28', label: 'Duplo sentido de circulação' },
  { value: 'R-29', label: 'Proibido trânsito de pedestres' },
  { value: 'R-30', label: 'Pedestre, ande pela esquerda' },
  { value: 'R-31', label: 'Pedestre, ande pela direita' },
  { value: 'R-32', label: 'Circulação exclusiva de ônibus' },
  { value: 'R-33', label: 'Sentido de circulação na rotatória' },
  { value: 'R-34', label: 'Circulação exclusiva de bicicletas' },
  { value: 'R-35a', label: 'Ciclista, transite à esquerda' },
  { value: 'R-35b', label: 'Ciclista, transite à direita' },
  {
    value: 'R-36a',
    label: 'Ciclistas à esquerda, pedestres à direita'
  },
  {
    value: 'R-36b',
    label: 'Pedestres à esquerda, ciclistas à direita'
  },
  {
    value: 'R-37',
    label: 'Proibido trânsito de motocicletas, motonetas e ciclomotores'
  },
  { value: 'R-38', label: 'Proibido trânsito de ônibus' },
  { value: 'R-39', label: 'Circulação exclusiva de caminhão' },
  { value: 'R-40', label: 'Trânsito proibido a carros de mão' },
  { value: 'R-41', label: 'Circulação exclusiva de VLT / bonde' },
  { value: 'R-42a', label: 'Ciclistas à esquerda, VLT à direita' },
  { value: 'R-42b', label: 'Ciclistas à direita, VLT à esquerda' },
  { value: 'R-43a', label: 'Veículos à esquerda, VLT à direita' },
  { value: 'R-43b', label: 'Veículos à direita, VLT à esquerda' },
  {
    value: 'R-44',
    label: 'Circulação compartilhada de ciclistas e pedestres'
  }
];




  return (
    <div className="container">
      <SelectComponent options={options} onSelect={handleSelect} />
      {lastItem && (
        <div key={lastItem.id}>
          {lastItem.image && lastItem.image.data && (
            <img src={convertBufferToBase64(lastItem.image.data)} alt="Item Image" onLoad={updatePosition} />
          )}
          
          <p>{lastItem.description}</p>
        </div>
      )}
      <div className="overlay" style={{top: position.y, left: position.x, width: position.l, height: position.h}}></div>
    </div>
  );
}
