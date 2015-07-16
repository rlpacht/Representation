# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150715230030) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contributions", force: :cascade do |t|
    t.float    "amount"
    t.integer  "cycle"
    t.string   "transaction_type"
    t.integer  "politician_id"
    t.integer  "contributor_id"
    t.string   "committee_name"
    t.string   "committee_ext_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "transaction_id"
  end

  create_table "contributors", force: :cascade do |t|
    t.string   "name"
    t.string   "organization_name"
    t.string   "contributor_occupation"
    t.string   "contributor_state"
    t.string   "contributor_zipcode"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "contributor_name"
    t.string   "contributor_gender"
  end

  create_table "politicians", force: :cascade do |t|
    t.string   "name"
    t.string   "recipient_ext_id"
    t.string   "party"
    t.string   "state"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

end
