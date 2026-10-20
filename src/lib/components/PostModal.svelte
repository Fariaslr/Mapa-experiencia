<script lang="ts">
  let { onFechar, onSalvar } = $props();

  // Estados dos dados da postagem
  let novoLocal = $state('');
  let novaCidade = $state('');
  let novoComentario = $state('');
  let novoSabor = $state(5);
  let novoAmbiente = $state(5);
  let novaImagem = $state('');
  
  let novaLat = $state(-12.6975); 
  let novaLng = $state(-38.3241);

  // Estados exclusivos para a barra de pesquisa
  let termoBusca = $state('');
  let resultadosBusca = $state<any[]>([]);
  let buscandoLocal = $state(false);

  // Função que chama a API do OpenStreetMap pelo texto
  async function buscarLocais() {
    if (!termoBusca) return;
    
    buscandoLocal = true;
    try {
      // addressdetails=1 garante que a API nos diga o nome exato da cidade e do local
      const resposta = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(termoBusca)}&limit=5&addressdetails=1`);
      resultadosBusca = await resposta.json();
    } catch (erro) {
      alert("Erro ao buscar locais. Tente novamente.");
    } finally {
      buscandoLocal = false;
    }
  }

  // Função executada quando você clica em um item da lista de resultados
  function selecionarLocal(local: any) {
    novaLat = parseFloat(local.lat);
    novaLng = parseFloat(local.lon);
    
    const address = local.address || {};
    novaCidade = address.city || address.town || address.village || address.municipality || 'Cidade desconhecida';
    novoLocal = local.name || address.road || 'Local selecionado';
    
    // Esconde a lista e limpa a barra de pesquisa
    resultadosBusca = [];
    termoBusca = '';
  }

  function salvar() {
    if (!novoLocal || !novoComentario) {
      alert("Preencha pelo menos o nome do local e o que achou!");
      return;
    }
    onSalvar({ novoLocal, novaCidade, novoComentario, novoSabor, novoAmbiente, novaImagem, novaLat, novaLng });
  }
</script>

<div class="modal-overlay">
  <div class="criar-post-card">
    <div class="modal-header">
      <h3>Registrar nova experiência</h3>
      <button class="btn-fechar" onclick={onFechar}>✖</button>
    </div>
    
    <div class="busca-container">

      <label class="busca-label" for="inputBusca">🔍 Encontre o local no mapa:</label>
      <div class="linha-busca">
        <input 
          id="inputBusca"
          type="text" 
          bind:value={termoBusca} 
          placeholder="Ex: Praia da Espera, Itacimirim" 
          onkeydown={(e) => e.key === 'Enter' && buscarLocais()}
        />
        <button class="btn-buscar" onclick={buscarLocais} disabled={buscandoLocal}>
          {buscandoLocal ? '...' : 'Buscar'}
        </button>
      </div>

      {#if resultadosBusca.length > 0}
        <ul class="lista-resultados">
          {#each resultadosBusca as local}
            <li>
              <!-- 2ª Correção: Um botão de verdade dentro da lista -->
              <button type="button" class="btn-resultado" onclick={() => selecionarLocal(local)}>
                <span class="nome-resultado">{local.name || 'Local'}</span>
                <span class="detalhe-resultado">{local.display_name}</span>
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    
    <hr class="divisor" />

    <!-- Entradas manuais (são preenchidas automaticamente ao clicar na busca) -->
    <div class="linha-inputs">
      <input type="text" bind:value={novoLocal} placeholder="Nome do local" />
      <input type="text" bind:value={novaCidade} placeholder="Cidade (ex: Camaçari, BA)" />
    </div>
    
    <input type="text" bind:value={novaImagem} placeholder="URL de uma foto (opcional)" />
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
  .criar-post-card { background: white; border-radius: 8px; padding: 24px; width: 100%; max-width: 500px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-height: 90vh; overflow-y: auto; }
  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .modal-header h3 { margin: 0; font-size: 18px; color: #242428; }
  .btn-fechar { background: none; border: none; font-size: 16px; color: #888; cursor: pointer; }
  .btn-fechar:hover { color: #333; }
  
  /* Estilos da Busca Inteligente */
  .busca-container { background: #f8f9fa; padding: 16px; border-radius: 8px; border: 1px solid #eee; margin-bottom: 16px; }
  .busca-label { display: block; font-size: 13px; font-weight: bold; color: #6b6b83; margin-bottom: 8px; }
  .linha-busca { display: flex; gap: 8px; }
  .linha-busca input { margin-bottom: 0; flex: 1; }
  .btn-buscar { background: #242428; color: white; border: none; padding: 0 16px; border-radius: 4px; font-weight: 600; cursor: pointer; }
  .btn-buscar:hover:not(:disabled) { background: #444; }
  
  .lista-resultados { list-style: none; padding: 0; margin: 8px 0 0 0; max-height: 150px; overflow-y: auto; background: white; border: 1px solid #ddd; border-radius: 4px; }
  .lista-resultados li { border-bottom: 1px solid #eee; }
  .lista-resultados li:last-child { border-bottom: none; }
  
  /* Novo estilo para o botão invisível que fica dentro da lista */
  .btn-resultado { width: 100%; text-align: left; background: none; border: none; padding: 10px; cursor: pointer; display: flex; flex-direction: column; gap: 4px; font-family: inherit; }
  .btn-resultado:hover { background: #f0f2f5; }
  
  .nome-resultado { font-weight: bold; font-size: 14px; color: #fc4c02; }
  .detalhe-resultado { color: #666; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .divisor { border: none; border-top: 1px solid #eee; margin: 16px 0; }
  
  .linha-inputs { display: flex; gap: 12px; margin-bottom: 12px; }
  input, textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 12px; box-sizing: border-box; font-family: inherit;}
  .linha-notas { display: flex; justify-content: space-between; align-items: center; margin-top: 8px;}
  .notas-inputs { display: flex; gap: 16px; }
  .notas-inputs input { width: 60px; margin-bottom: 0; }
  .btn-postar { background: #fc4c02; color: white; border: none; padding: 10px 24px; border-radius: 4px; font-weight: bold; cursor: pointer; }
  .btn-postar:hover { background: #e34402; }
</style>