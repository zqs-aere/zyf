<template>
  <div class="user-management">
    <div class="title">
      服务目录
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="small"
        style="float:right"
        @click="addCatalog"
      >新建</el-button>
    </div>

    <!--<div class="flex-box add">
      <span @click="addCatalog">
        <i class="el-icon-plus"></i>
        添加目录
      </span>
    </div>-->

    <el-dialog
      width="610px"
      :close-on-click-modal="false"
      :visible.sync="show_edit_dlg"
      :title="current.id?'修改目录':'新建目录'"
    >
      <ul class="ul-reset">
        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >目录名称</div>
          <el-input style="width: 440px;" v-model="current.name"></el-input>
        </li>

        <!-- <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >目录编码</div>
          <el-input style="width: 440px;" v-model="current.code"></el-input>
        </li>-->

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">描述</div>
          <el-input style="width: 440px;" v-model="current.desc"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >目录分组</div>
          <el-select
            :multiple="false"
            style="width: 440px;"
            v-model="current.pid"
            clearable
            @change="onCategroyChanged"
            placeholder="请选择"
          >
            <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">排序</div>
          <el-input type="number" style="width: 440px;" v-model="current.order"></el-input>
        </li>

        <li class="flex-box" style="justify-content: flex-end;">
          <el-button @click="show_edit_dlg=false">取消</el-button>
          <el-button type="primary" @click="save_catalog">确定</el-button>
        </li>
      </ul>
    </el-dialog>

    <div class="list mg-t40">
      <el-table
        @row-click="expandRow"
        ref="mainTable"
        :border="false"
        :default-expand-all="true"
        size="medium"
        :data="tableData"
        row-class-name="custom-tr"
        style="width: 100%"
      >
        <!-- :default-expand-all="true" -->
        <el-table-column type="expand">
          <template v-if="row.subject.length>0" slot-scope="{row}">
            <el-table size="mini" :show-header="false" :data="row.subject" style="width: 100%">
              <el-table-column type="index" width="80" class-name="subject-col" prop="count"></el-table-column>
              <el-table-column prop="name" width="180" class-name="subject-col"></el-table-column>
              <!-- <el-table-column prop="code" width="100" class-name="subject-col"></el-table-column> -->
              <el-table-column prop="desc" width="200" class-name="subject-col"></el-table-column>
              <el-table-column prop="order" width="60" class-name="subject-col"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button @click="editCatalog(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteCatalog(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="序号" width="80" align="left" type="index" prop="id"></el-table-column>
        <el-table-column label="目录名称" width="180">
          <div slot-scope="props" style="font-weight: 600;">{{ props.row.name }}</div>
        </el-table-column>
        <el-table-column label="描述" prop="desc" width="200"></el-table-column>
        <el-table-column label="排序" prop="order" width="60"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="editCatalog(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteCatalog(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import api from "@/api";
import api from "../../api";
// import { async } from "q";
export default {
  name: "UserManagement",
  data() {
    return {
      tableData: [],
      show_edit_dlg: false,
      current: { order: 0 }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      api.catalog.catalog_list().then(res => {
        this.tableData = res;
      });
    },
    addCatalog() {
      this.show_edit_dlg = true;
      this.current = {
        name: "",
        pid: "",
        order: Math.max(...this.tableData.map(r => r.order || 0), 0) + 1
      };
    },
    editCatalog(row) {
      this.show_edit_dlg = true;
      this.current = JSON.parse(JSON.stringify(row));
    },
    deleteCatalog(row) {
      if (row.subject && row.subject.length > 0) {
        this.$message({
          message: `${row.name} 下有子目录，请先删除子目录`,
          type: "error"
        });
        return;
      }
      this.$confirm(`是否删除目录 ${row.name}? 目录删除后，服务也将移出目录`, "提示", {
        type: "warning"
      })
        .then(async () => {
          await api.catalog.delCatalog(row.id);
          this.$message({ message: "删除成功", type: "success" });
          this.getList();
        })
        .catch(() => {});
    },
    onCategroyChanged(item) {
      var order = 0;
      if (!item) {
        order = Math.max(...this.table.map(r => r.order || 0), 0);
      } else {
        order = Math.max(
          ...this.tableData.find(r => r.id === item).subject.map(r => r.order),
          0
        );
      }
      this.current.order = (order || 0) + 1;
    },
    async save_catalog() {
      if (!this.current.id) {
        try {
          var ok = await api.catalog.create(this.current);
          if (ok == true) {
            this.$message({ message: "添加成功", type: "success" });
            this.show_edit_dlg = false;
            this.getList();
          }
        } catch (err) {
          this.$message({ message: "添加失败", type: "error" });
        }
      } else {
        try {
          let result = await api.catalog.update(this.current);
          if (result === true) {
            this.$message({ message: "修改成功", type: "success" });
            this.show_edit_dlg = false;
            this.getList();
          }
        } catch (err) {
          console.error(err);
          this.$message({ message: "修改失败", type: "error" });
        }
      }
    },

    expandRow(row, col, evt) {
      this.$refs.mainTable.toggleRowExpansion(row, true);
    }
  }
};
</script>

<style lang="scss">
.user-management {
  border-radius: 4px;
  box-shadow: 0 -1px 0 0 #e6eaee;
  background-color: #ffffff;
  padding: 24px 32px;

  .custom-tr {
    background-color: #f6f6f6 !important;
  }

  .title {
    font-size: 20px;
    font-weight: 600;
    padding-left: 12px;
    border-left: 4px solid #4874ed;
    color: #292929;
    margin-bottom: 24px;
  }

  .add {
    text-align: center;
    justify-content: center;
    height: 52px;
    border-radius: 4px;
    border: dashed 1px #dfe3e9;
    span {
      cursor: pointer;
    }
  }

  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .subject-col {
    padding-left: 24px;
  }
}
</style>
