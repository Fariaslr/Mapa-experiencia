<script lang="ts">
  import { feedExperiencias } from '../lib/dadosMock';
  import Header from '../lib/components/Header.svelte';
  import PostModal from '../lib/components/PostModal.svelte';
  import PostCard from '../lib/components/PostCard.svelte';

  let posts = [...feedExperiencias];
  let mostrarFormulario = false;

  function adicionarMemoria(evento: any) {
    const dados = evento.detail;

    const novaMemoria = {
      id: 'post-' + Date.now(),
      autor: {
        id: 'user-lucas',
        nome: 'Lucas Farias',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas'
      },
      local: {
        nome: dados.novoLocal,
        cidade: dados.novaCidade || 'Camaçari, Bahia',
        latitude: -12.6975,
        longitude: -38.3241
      },
      avaliacao: {
        sabor: dados.novoSabor,
        ambiente: dados.novoAmbiente,
        comentario: dados.novoComentario
      },
      data_visita: new Date().toISOString(),
      imagem: dados.novaImagem || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amigos_marcados: [
        { id: 'user-mel', nome: 'Mel Sabbatini', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mel' }
      ],
      social: { likes: 0, comentarios: [] }
    };

    posts = [novaMemoria, ...posts];
    mostrarFormulario = false;
  }
</script>

<Header on:abrirModal={() => mostrarFormulario = true} />

{#if mostrarFormulario}
  <PostModal 
    on:fechar={() => mostrarFormulario = false} 
    on:salvar={adicionarMemoria} 
  />
{/if}

<div class="feed-container">
  {#each posts as post}
    <!-- Passamos o objeto 'post' para dentro do componente -->
    <PostCard {post} />
  {/each}
</div>

<style>
  :global(body) { margin: 0; padding: 0; background-color: #f0f2f5; }
  .feed-container { max-width: 600px; margin: 24px auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 0 10px; }
</style>