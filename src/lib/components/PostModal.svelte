<script lang="ts">
  let { onFechar, onSalvar } = $props();

  let novoLocal = '';
  let novaCidade = '';
  let novoComentario = '';
  let novoSabor = 5;
  let novoAmbiente = 5;
  let novaImagem = '';
  
  let novaLat = -12.6975; 
  let novaLng = -38.3241;

  let buscandoLocal = false;

  async function pegarLocalizacaoAtual() {
    if (!navigator.geolocation) {
      alert("O seu navegador não suporta geolocalização.");
      return;
    }

    buscandoLocal = true;

    navigator.geolocation.getCurrentPosition(
      async (posicao) => {
        novaLat = posicao.coords.latitude;
        novaLng = posicao.coords.longitude;

        try {
          const resposta = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${novaLat}&lon=${novaLng}`);
          const dados = await resposta.json();

          novaCidade = dados.address.city || dados.address.town || dados.address.village || 'Cidade desconhecida';
          novoLocal = dados.name || dados.address.road || 'Local não nomeado';
        } catch (erro) {
          alert("Erro ao buscar o endereço.");
        } finally {
          buscandoLocal = false;
        }
      },
      (erro) => {
        alert("Não foi possível aceder à sua localização.");
        buscandoLocal = false;
      }
    );
  }

  function salvar() {
    if (!novoLocal || !novoComentario) {
      alert("Preencha pelo menos o nome do local e o que achou!");
      return;
    }
    // Usa a propriedade do Svelte 5 em vez de dispatch
    onSalvar({ novoLocal, novaCidade, novoComentario, novoSabor, novoAmbiente, novaImagem, novaLat, novaLng });
  }
</script>

<div class="modal-overlay">
  <div class="criar-post-card">
    <div class="modal-header">
      <h3>Registrar nova experiência</h3>
      <!-- onclick em vez de on:click -->
      <button class="btn-fechar" onclick={onFechar}>✖</button>
    </div>
    
    <div class="linha-botoes-topo">
      <button class="btn-gps" onclick={pegarLocalizacaoAtual} disabled={buscandoLocal}>
        {buscandoLocal ? 'A procurar satélites...' : '📍 Preencher com a minha localização'}
      </button>
    </div>
    
    <div class="linha-inputs">
      <input type="text" bind:value={novoLocal} placeholder="Onde foram? (ex: Pizzaria)" />
      <input type="text" bind:value={novaCidade} placeholder="Cidade (ex: Camaçari, BA)" />
    </div>
    
    <input type="text" bind:value={novaImagem} placeholder="URL de uma imagem (opcional)" />
    <textarea bind:value={novoComentario} rows="3" placeholder="Como foi a experiência?"></textarea>
    
    <div class="linha-notas">
      <div class="notas-inputs">
        <label>⭐ Sabor: <input type="number" min="1" max="5" bind:value={novoSabor} /></label>
        <label>🏖️ Ambiente: <input type="number" min="1" max="5" bind:value={novoAmbiente} /></label>
      </div>
      <button class="btn-postar" onclick={salvar}>Publicar</button>
    </div>
  </div>
</div>

<style>
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
  .criar-post-card { background: white; border-radius: 8px; padding: 24px; width: 100%; max-width: 500px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .modal-header h3 { margin: 0; font-size: 18px; color: #242428; }
  .btn-fechar { background: none; border: none; font-size: 16px; color: #888; cursor: pointer; }
  .btn-fechar:hover { color: #333; }
  .linha-botoes-topo { margin-bottom: 16px; }
  .btn-gps { width: 100%; background-color: #f8f9fa; color: #242428; border: 1px solid #ddd; padding: 10px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: background-color 0.2s; }
  .btn-gps:hover:not(:disabled) { background-color: #e9ecef; }
  .btn-gps:disabled { opacity: 0.6; cursor: not-allowed; }
  .linha-inputs { display: flex; gap: 12px; margin-bottom: 12px; }
  input, textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 12px; box-sizing: border-box; font-family: inherit;}
  .linha-notas { display: flex; justify-content: space-between; align-items: center; margin-top: 8px;}
  .notas-inputs { display: flex; gap: 16px; }
  .notas-inputs input { width: 60px; margin-bottom: 0; }
  .btn-postar { background: #fc4c02; color: white; border: none; padding: 10px 24px; border-radius: 4px; font-weight: bold; cursor: pointer; }
  .btn-postar:hover { background: #e34402; }
</style>