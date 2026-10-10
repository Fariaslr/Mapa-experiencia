<script lang="ts">
  import { onMount } from 'svelte';
  import 'leaflet/dist/leaflet.css';

  let mapElement: HTMLElement;
  let map: any;
  let L: any;

  // Variáveis para controlar o formulário
  let mostrarFormulario = false;
  let latAtual = 0;
  let lngAtual = 0;
  let nomeLocal = '';

  onMount(async () => {
    L = await import('leaflet');
    map = L.map(mapElement).setView([-12.6975, -38.3241], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Evento: Quando o utilizador clica no mapa
    map.on('click', (evento: any) => {
      latAtual = evento.latlng.lat;
      lngAtual = evento.latlng.lng;
      mostrarFormulario = true; // Abre a janela do formulário
    });
  });

  // Função para guardar o local na base de dados
  async function guardarLocal() {
    const resposta = await fetch('/api/locais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nomeLocal,
        latitude: latAtual,
        longitude: lngAtual
      })
    });

    if (resposta.ok) {
      // Adiciona o pino visualmente após guardar
      L.marker([latAtual, lngAtual]).addTo(map)
        .bindPopup(nomeLocal)
        .openPopup();
      
      // Limpa e fecha o formulário
      nomeLocal = '';
      mostrarFormulario = false;
    }
  }
</script>

<div class="map-container" bind:this={mapElement}></div>

<!-- Formulário flutuante que aparece ao clicar no mapa -->
{#if mostrarFormulario}
  <div class="modal">
    <h3>Novo Local</h3>
    <p>Lat: {latAtual.toFixed(4)}, Lng: {lngAtual.toFixed(4)}</p>
    
    <input type="text" bind:value={nomeLocal} placeholder="Nome do local (ex: Hamburgueria)" />
    
    <div class="botoes">
      <button on:click={guardarLocal}>Guardar</button>
      <button on:click={() => mostrarFormulario = false}>Cancelar</button>
    </div>
  </div>
{/if}

<style>
  :global(body) { margin: 0; padding: 0; font-family: sans-serif; }
  .map-container { width: 100vw; height: 100vh; }
  
  .modal {
    position: absolute;
    top: 20px;
    right: 20px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000; /* Garante que fica por cima do mapa */
    width: 300px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    box-sizing: border-box;
  }
  
  .botoes {
    display: flex;
    justify-content: space-between;
  }
</style>