<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="clickTab"
  >
    <el-tab-pane
      v-for="tab in editableTabs"
      :key="tab.name"
      :label="tab.title"
      :name="tab.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tabs',
  computed: {
    editableTabsValue: {
      get() {
        return this.$store.state.menu.editableTabsValue
      },
      set(val) {
        this.$store.state.menu.editableTabsValue = val
      }
    },
    editableTabs: {
      get() {
        return this.$store.state.menu.editableTabs
      },
      set(val) {
        this.$store.state.menu.editableTabs = val
      }
    }
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;

      if (targetName === 'Home') {
        return false;
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({ name: activeName })
    },
    clickTab(tab) {
      this.$router.push({ name: tab.name })
    }
  }
}
</script>

<style>
</style>