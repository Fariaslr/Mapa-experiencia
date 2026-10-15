<script lang="ts">
  import { feedExperiencias } from "../lib/dadosMock";
</script>

<div class="feed-container">
  {#each feedExperiencias as post}
    <article class="post-card">
      <!-- Cabeçalho -->
      <div class="post-header">
        <img src={post.autor.foto} alt="Avatar" class="avatar" />
        <div class="info-local">
          <h2>{post.autor.nome}</h2>
          <p class="local">📍 {post.local.nome} • {post.local.cidade}</p>
        </div>
      </div>

      <!-- Corpo: A Imagem da Experiência -->
      {#if post.imagem}
        <img src={post.imagem} alt="Foto da experiência" class="post-imagem" />
      {/if}

      <!-- Corpo: Textos e Marcações -->
      <div class="post-body">
        <p class="notas">
          ⭐ Sabor: {post.avaliacao.sabor}/5 | 🏖️ Ambiente: {post.avaliacao
            .ambiente}/5
        </p>
        <p class="comentario">"{post.avaliacao.comentario}"</p>

        {#if post.amigos_marcados.length > 0}
          <div class="marcacoes">
            <span>Com: </span>
            {#each post.amigos_marcados as amigo}
              <span class="tag-amigo">@{amigo.nome}</span>
            {/each}
          </div>
        {/if}
      </div>

      <!-- O Mini Mapa da Postagem -->
      <div class="mini-mapa">
        <iframe
          title="Mapa de {post.local.nome}"
          width="100%"
          height="150"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://www.openstreetmap.org/export/embed.html?bbox={post.local
            .longitude - 0.005},{post.local.latitude - 0.005},{post.local
            .longitude + 0.005},{post.local.latitude +
            0.005}&layer=mapnik&marker={post.local.latitude},{post.local
            .longitude}"
        >
        </iframe>
      </div>

      <!-- Rodapé: Interações -->
      <div class="post-footer">
        <button class="btn-like">❤️ {post.social.likes} Likes</button>
        <button class="btn-comment"
          >💬 {post.social.comentarios.length} Comentários</button
        >
      </div>
    </article>
  {/each}
</div>

<style>
  .feed-container {
    max-width: 500px;
    margin: 20px auto;
    font-family: sans-serif;
    background-color: #f0f2f5;
    padding: 10px;
  }

  .post-card {
    background: white;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden; /* Mantém a imagem dentro da borda arredondada */
  }

  .post-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .info-local h2 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  .info-local .local {
    margin: 4px 0 0 0;
    font-size: 13px;
    color: #666;
  }

  /* Estilo da nova imagem principal */
  .post-imagem {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .post-body {
    padding: 16px;
  }

  .notas {
    font-weight: bold;
    font-size: 14px;
    margin-top: 0;
  }
  .comentario {
    font-size: 15px;
    color: #444;
    line-height: 1.4;
  }

  .marcacoes {
    margin-top: 12px;
    font-size: 14px;
    color: #555;
  }
  .tag-amigo {
    background: #eef2ff;
    color: #4f46e5;
    padding: 4px 8px;
    border-radius: 16px;
    font-weight: 500;
  }

  /* Área do mini mapa */
  .mini-mapa {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #fafafa;
  }

  .post-footer {
    display: flex;
    gap: 16px;
    padding: 12px 16px;
  }

  button {
    background: none;
    border: none;
    color: #666;
    font-weight: bold;
    cursor: pointer;
    font-size: 15px;
    transition: color 0.2s;
  }

  .btn-like:hover {
    color: #e0245e;
  }
</style>
