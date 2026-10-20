<script lang="ts">
  let { onAbrirModal } = $props();
</script>

<header class="app-header">
  <a href="/" class="logo-link">
    <div class="logo">
      <span class="logo-icon">🗺️</span>
      <h1>Experiências</h1>
    </div>
  </a>

  <div class="acoes-header">
    <button class="btn-novo" aria-label="Adicionar nova experiência" onclick={onAbrirModal}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    </button>
    
    <a href="/perfil/user-lucas" class="avatar-link" aria-label="Ir para o meu perfil">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas" alt="Meu Perfil" class="avatar-header" />
    </a>
  </div>
</header>

<style>
  .app-header { 
    position: sticky; top: 0; z-index: 50; 
    background-color: #fc4c02; /* Fundo Cor-de-Laranja vibrante */
    height: 60px; 
    border-bottom: 1px solid #e34402; 
    display: flex; align-items: center; justify-content: space-between; 
    padding: 0 20px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); 
  }
  
  .logo-link { text-decoration: none; display: flex; align-items: center; }
  .avatar-link { display: flex; align-items: center; border-radius: 50%; transition: opacity 0.2s; }
  .avatar-link:hover { opacity: 0.8; } 

  .logo { display: flex; align-items: center; gap: 8px; }
  /* Texto da marca passa a ser branco para contrastar com o fundo */
  .logo h1 { font-size: 20px; font-weight: 800; color: #ffffff; margin: 0; letter-spacing: -0.5px; } 
  .logo-icon { font-size: 24px; }
  
  .acoes-header { display: flex; align-items: center; gap: 16px; }
  
  .btn-novo { 
    background: rgba(255, 255, 255, 0.2); /* Fundo do botão semi-transparente */
    border: none; 
    color: #ffffff; /* Ícone do + a branco */
    cursor: pointer; 
    display: flex; align-items: center; justify-content: center; 
    padding: 4px; 
    border-radius: 50%; 
    transition: background-color 0.2s; 
  }
  .btn-novo:hover { background-color: rgba(255, 255, 255, 0.35); }
  
  /* Borda branca à volta do avatar para dar destaque */
  .avatar-header { width: 36px; height: 36px; border-radius: 50%; border: 2px solid #ffffff; } 
</style>