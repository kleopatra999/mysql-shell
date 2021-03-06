/*
 * Copyright (c) 2016, 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2 of the
 * License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

#ifndef MODULES_ADMINAPI_MOD_DBA_PROVISIONING_INTERFACE_H_
#define MODULES_ADMINAPI_MOD_DBA_PROVISIONING_INTERFACE_H_

#include <string>
#include <vector>

#include "shellcore/types.h"
#include "shellcore/types_cpp.h"
#include "shellcore/shell_core_options.h"
#include "shellcore/lang_base.h"

namespace mysqlsh {
namespace dba {
#if DOXYGEN_CPP
/**
* Represents an Interface to the mysqlprovision utility
*/
#endif
class ProvisioningInterface {
public:
  ProvisioningInterface(shcore::Interpreter_delegate* deleg);
  ~ProvisioningInterface();

  int check(const std::string &user, const std::string &host, int port, const std::string &password,
            const shcore::Value::Map_type_ref &instance_ssl,
            const std::string &cnfpath, bool update, shcore::Value::Array_type_ref &errors);

  int create_sandbox(int port, int portx, const std::string &sandbox_dir,
                     const std::string &password,
                     const shcore::Value &mycnf_options,
                     bool ignore_ssl_error,
                     shcore::Value::Array_type_ref &errors);
  int delete_sandbox(int port, const std::string &sandbox_dir,
                     shcore::Value::Array_type_ref &errors);
  int kill_sandbox(int port, const std::string &sandbox_dir,
                   shcore::Value::Array_type_ref &errors);
  int stop_sandbox(int port, const std::string &sandbox_dir,
                   const std::string &password,
                   shcore::Value::Array_type_ref &errors);
  int start_sandbox(int port, const std::string &sandbox_dir,
                   shcore::Value::Array_type_ref &errors);
  int start_replicaset(const std::string &instance_url,
                 const shcore::Value::Map_type_ref &instance_ssl,
                 const std::string &repl_user,
                 const std::string &super_user_password, const std::string &repl_user_password,
                 bool multi_master, const std::string &ssl_mode, const std::string &ip_whitelist,
                 shcore::Value::Array_type_ref &errors);
  int join_replicaset(const std::string &instance_url,
                 const shcore::Value::Map_type_ref &instance_ssl,
                 const std::string &repl_user,
                 const std::string &peer_instance_url, 
                 const shcore::Value::Map_type_ref &peer_instance_ssl,
                 const std::string &super_user_password,
                 const std::string &repl_user_password,
                 const std::string &ssl_mode, const std::string &ip_whitelist,
                 const std::string &gr_group_seeds,
                 bool skip_rpl_user,
                 shcore::Value::Array_type_ref &errors);

  int leave_replicaset(const std::string &instance_url,
                       const shcore::Value::Map_type_ref &instance_ssl,
                       const std::string &super_user_password,
                       shcore::Value::Array_type_ref &errors);

  void set_verbose(int verbose) { _verbose = verbose; }
  int get_verbose() { return _verbose; }

private:
  int _verbose;
  shcore::Interpreter_delegate *_delegate;
  std::string _local_mysqlprovision_path;

  int execute_mysqlprovision(const std::string &cmd, const std::vector<const char *> &args,
                const std::vector<std::string> &passwords,
                shcore::Value::Array_type_ref &errors, int verbose);
  int exec_sandbox_op(const std::string &op, int port, int portx, const std::string &sandbox_dir,
                     const std::string &password,
                     const std::vector<std::string> &extra_args,
                      shcore::Value::Array_type_ref &errors);
  void set_ssl_args(const std::string &prefix,
                    const shcore::Value::Map_type_ref &instance_ssl,
                    std::vector<const char *> &args);
};
}  // namespace mysqlx
}  // namespace mysqlsh

#endif  // MODULES_ADMINAPI_MOD_DBA_PROVISIONING_INTERFACE_H_
