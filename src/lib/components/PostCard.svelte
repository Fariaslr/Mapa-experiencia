<script lang="ts">
  let { post } = $props(); 
  let curtiu = $state(false);

  function alternarLike() {
    if (curtiu) {
      post.social.likes--; 
      curtiu = false;
    } else {
      post.social.likes++; 
      curtiu = true;
    }
  }
</script>

<article class="post-card">
  <a href="/perfil/{post.autor.id}" class="post-header-link">
    <div class="post-header">
      <img src={post.autor.foto} alt="Avatar" class="avatar" />
      <div class="header-info">
        <h2>{post.autor.nome}</h2>
        <p class="data-local">{new Date(post.data_visita).toLocaleDateString('pt-BR')} · App Experiências · {post.local.cidade}</p>
      </div>
    </div>
  </a>

  <div class="post-titulo">
    <span class="icone-atividade">🍽️</span>
    <h3>Experiência em {post.local.nome}</h3>
  </div>

  <div class="estatisticas">
    <div class="stat-coluna">
      <span class="stat-label">Sabor</span>
      <strong class="stat-valor">{post.avaliacao.sabor}/5</strong>
    </div>
    <div class="stat-coluna borda-esquerda">
      <span class="stat-label">Ambiente</span>
      <strong class="stat-valor">{post.avaliacao.ambiente}/5</strong>
    </div>
    <div class="stat-coluna borda-esquerda">
      <span class="stat-label">Companhia</span>
      <strong class="stat-valor">
        {#if post.amigos_marcados.length > 0}
          {post.amigos_marcados[0].nome}
        {:else}
          Solo
        {/if}
      </strong>
    </div>
  </div>

  <div class="media-grid">
    <div class="media-mapa">
      <iframe title="Mapa" width="100%" height="100%" frameborder="0" scrolling="no" src="https://www.openstreetmap.org/export/embed.html?bbox={post.local.longitude-0.005},{post.local.latitude-0.005},{post.local.longitude+0.005},{post.local.latitude+0.005}&layer=mapnik&marker={post.local.latitude},{post.local.longitude}"></iframe>
    </div>
    {#if post.imagem}
      <div class="media-imagem">
        <img src={post.imagem} alt="Foto da experiência" />
      </div>
    {/if}
  </div>

  <div class="post-body">
    <p class="comentario">"{post.avaliacao.comentario}"</p>
  </div>

  <div class="post-footer">
    <button 
      class="btn-like {curtiu ? 'curtido' : ''}" 
      onclick={alternarLike}
    >
      {curtiu ? '❤️' : '👍'} {post.social.likes} Likes
    </button>
    <button class="btn-comment">💬 {post.social.comentarios.length} Comentários</button>
  </div>
</article>

<style>
  .post-header-link { text-decoration: none; color: inherit; display: block; }
  .post-header-link:hover .header-info h2 { color: #fc4c02; } 
  
  .post-card { background: white; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); padding: 16px; }
  .post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .avatar { width: 40px; height: 40px; border-radius: 50%; }
  .header-info h2 { margin: 0; font-size: 15px; font-weight: 600; color: #242428; transition: color 0.2s; }
  .header-info .data-local { margin: 2px 0 0 0; font-size: 12px; color: #6b6b83; }
  .post-titulo { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .icone-atividade { font-size: 24px; }
  .post-titulo h3 { margin: 0; font-size: 20px; font-weight: 700; color: #242428; }
  .estatisticas { display: flex; margin-bottom: 16px; }
  .stat-coluna { flex: 1; display: flex; flex-direction: column; padding-right: 16px; }
  .borda-esquerda { border-left: 1px solid #efefef; padding-left: 16px; }
  .stat-label { font-size: 12px; color: #6b6b83; margin-bottom: 2px; }
  .stat-valor { font-size: 22px; font-weight: 300; color: #242428; }
  .media-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 16px; height: 250px; }
  .media-mapa { background: #e5e5e5; height: 100%; overflow: hidden; }
  .media-imagem { height: 100%; overflow: hidden; }
  .media-imagem img { width: 100%; height: 100%; object-fit: cover; }
  .post-body { margin-bottom: 16px; }
  .comentario { font-size: 15px; color: #242428; line-height: 1.5; margin: 0; }
  .post-footer { display: flex; gap: 16px; border-top: 1px solid #efefef; padding-top: 12px; }
  
  .post-footer button { background: none; border: none; color: #6b6b83; font-weight: 600; cursor: pointer; font-size: 14px; transition: all 0.2s; }
  .btn-like:hover { color: #fc4c02; }
  
  .curtido { color: #fc4c02 !important; transform: scale(1.05); }
</style>