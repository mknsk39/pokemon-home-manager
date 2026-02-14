<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="app-header__brand">
        <BaseIcon icon="mdi-pokeball" size="24" class="mr-2" />
        <span class="text-subtitle-1 font-weight-bold">Pokemon HOME Manager</span>
      </div>

      <div class="app-header__actions">
        <BaseMenu v-if="profile" v-model="menuOpen">
          <template #activator="{ props }">
            <BaseButton
              v-bind="props"
              variant="text"
              :disabled="logoutLoading"
              prepend-icon="mdi-account-circle"
            >
              {{ profile.displayName }}
            </BaseButton>
          </template>

          <BaseCard class="pa-2 app-header__menu-card" elevation="4" rounded="lg">
            <div class="d-flex align-center px-3 py-2">
              <img
                v-if="profile.photoURL"
                :src="profile.photoURL"
                alt="avatar"
                class="app-header__avatar mr-3"
              >
              <BaseIcon
                v-else
                icon="mdi-account-circle"
                size="36"
                class="mr-3"
              />
              <div class="min-width-0">
                <div class="text-body-2 font-weight-medium truncate">
                  {{ profile.displayName }}
                </div>
                <div class="text-caption text-medium-emphasis truncate">
                  {{ profile.id }}
                </div>
              </div>
            </div>

            <div class="px-2 pb-2">
              <BaseButton
                block
                color="error"
                variant="text"
                prepend-icon="mdi-logout"
                :loading="logoutLoading"
                @click="handleLogout"
              >
                ログアウト
              </BaseButton>
              <p v-if="error" class="text-error text-caption mt-2 px-2">
                {{ error }}
              </p>
            </div>
          </BaseCard>
        </BaseMenu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { UserProfile } from '../../types/auth'

interface Props {
  profile: UserProfile | null
  logoutLoading: boolean
  error?: string | null
}

withDefaults(defineProps<Props>(), {
  error: null,
})

const emit = defineEmits<{
  logout: []
}>()

const menuOpen = ref(false)

const handleLogout = () => {
  menuOpen.value = false
  emit('logout')
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.app-header__inner {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.app-header__actions {
  display: flex;
  align-items: center;
}

.app-header__avatar {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  object-fit: cover;
}

.app-header__menu-card {
  width: min(320px, 90vw);
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
