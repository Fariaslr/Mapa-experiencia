<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<header class="app-header">
  <div class="logo">
    <span class="logo-icon">🗺️</span>
    <h1>Experiências</h1>
  </div>
  
  <div class="acoes-header">
    <button class="btn-novo" on:click={() => dispatch('abrirModal')}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    </button>
    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas" alt="Meu Perfil" class="avatar-header" />
  </div>
</header>

<style>
  .app-header {
    position: sticky; top: 0; z-index: 50; background-color: white; height: 60px;
    border-bottom: 1px solid #e5e5e5; display: flex; align-items: center;
    justify-content: space-between; padding: 0 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .logo { display: flex; align-items: center; gap: 8px; }
  .logo h1 { font-size: 20px; font-weight: 800; color: #fc4c02; margin: 0; letter-spacing: -0.5px; }
  .logo-icon { font-size: 24px; }
  .acoes-header { display: flex; align-items: center; gap: 16px; }
  .btn-novo {
    background: none; border: none; color: #fc4c02; cursor: pointer; display: flex;
    align-items: center; justify-content: center; padding: 4px; border-radius: 50%;
    transition: background-color 0.2s;
  }
  .btn-novo:hover { background-color: #fff0eb; }
  .avatar-header { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #efefef; }
</style>