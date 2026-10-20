<script lang="ts">
  import { page } from "$app/state";
  import { feedExperiencias } from "../../../lib/dadosMock"; 
  import Header from "../../../lib/components/Header.svelte";
  import PostCard from "../../../lib/components/PostCard.svelte";

  let userId = $derived(page.params.id);
  
  let postsDoUsuario = $derived(
    feedExperiencias.filter((post: any) => post.autor.id === userId)
  );

  let usuario = $derived(
    postsDoUsuario.length > 0 ? postsDoUsuario[0].autor : null
  );

  // Ação do Svelte para criar o mapa de calor/histórico no cabeçalho
  function criarMapaDeExperiencias(node: HTMLElement, posts: any[]) {
    let map: any;
    let layerGroup: any;

    // Importação dinâmica para rodar o Leaflet apenas no cliente
    import("leaflet").then((L) => {
      // Garante que o CSS do Leaflet seja injetado sem dar erro no seu projeto
      if (!document.getElementById("leaflet-css-header")) {
        const link = document.createElement("link");
        link.id = "leaflet-css-header";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      // Inicializa o mapa. scrollWheelZoom false impede que a página trave ao rolar para baixo
      map = L.map(node, { scrollWheelZoom: false, zoomControl: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      layerGroup = L.layerGroup().addTo(map);

      atualizarMarcadores(posts, L);
    });

    function atualizarMarcadores(novosPosts: any[], L: any) {
      if (!map || !layerGroup) return;

      layerGroup.clearLayers();
      const pontos: [number, number][] = [];

      // Forçamos o ícone padrão via link externo para evitar bugs de imagem quebrada no Vite
      const iconePadrao = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      novosPosts.forEach((post) => {
        const lat = post.local.latitude;
        const lng = post.local.longitude;
        const m = L.marker([lat, lng], { icon: iconePadrao });
        m.bindPopup(`<b>${post.local.nome}</b>`);
        layerGroup.addLayer(m);
        pontos.push([lat, lng]);
      });

      // A mágica: a câmera do mapa enquadra automaticamente todos os seus pinos
      if (pontos.length > 0) {
        map.fitBounds(pontos, { padding: [30, 30], maxZoom: 15 });
      } else {
        map.setView([-12.6975, -38.3241], 13);
      }
    }

    return {
      update(novosPosts: any[]) {
        import("leaflet").then((L) => atualizarMarcadores(novosPosts, L));
      },
      destroy() {
        if (map) map.remove();
      },
    };
  }
</script>

<Header
  onAbrirModal={() =>
    alert("Volte para a página inicial para registrar um novo rolê!")}
/>

{#if usuario}
  <div class="perfil-container">
    <!-- Substituímos a capa laranja antiga pelo Mapa Dinâmico -->
    <div
      class="capa-perfil-mapa"
      use:criarMapaDeExperiencias={postsDoUsuario}
    ></div>

    <div class="info-perfil">
      <img
        src={usuario.foto}
        alt="Avatar de {usuario.nome}"
        class="avatar-grande"
      />
      <h2>{usuario.nome}</h2>
      <p class="estatisticas">
        📍 {postsDoUsuario.length} experiências mapeadas
      </p>
    </div>

    <div class="feed-usuario">
      {#each postsDoUsuario as post}
        <PostCard {post} />
      {/each}

      {#if postsDoUsuario.length === 0}
        <p class="sem-posts">Nenhuma experiência registrada ainda.</p>
      {/if}
    </div>
  </div>
{:else}
  <div class="perfil-container erro">
    <h2>Usuário não encontrado</h2>
    <a href="/">Voltar para o Feed</a>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #f0f2f5;
  }

  .perfil-container {
    max-width: 600px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }

  /* Novo estilo da capa com mapa */
  .capa-perfil-mapa {
    height: 220px; /* Mais alto que a faixa laranja antiga para o mapa brilhar */
    width: 100%;
    background: #e5e5e5;
    z-index: 1;
    position: relative;
  }

  .info-perfil {
    background: white;
    padding: 0 20px 24px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 2; /* Garante que o painel branco sobreponha a parte inferior do mapa */
  }

  .avatar-grande {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: 4px solid white;
    margin-top: -48px;
    background: #f0f2f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 3;
  }

  .info-perfil h2 {
    margin: 12px 0 4px;
    font-size: 24px;
    color: #242428;
  }
  .estatisticas {
    color: #6b6b83;
    font-size: 14px;
    margin: 0;
    font-weight: 500;
  }

  .feed-usuario {
    padding: 0 10px;
  }
  .sem-posts {
    text-align: center;
    color: #6b6b83;
    margin-top: 40px;
  }

  .erro {
    text-align: center;
    padding-top: 100px;
  }
  .erro a {
    color: #fc4c02;
    text-decoration: none;
    font-weight: bold;
  }
</style>
