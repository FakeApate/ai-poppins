CREATE KEYSPACE aipoppins WITH replication = {'class': 'NetworkTopologyStrategy', 'europe-west1': '3'}  AND durable_writes = true;

CREATE TABLE aipoppins.tasks (
    name text,
    repeating text,
    category text,
    data list<frozen<tuple<text, frozen<map<text, text>>>>>,
    description text,
    due_date timestamp,
    priority int,
    start_date timestamp,
    PRIMARY KEY ((name, repeating))
) WITH additional_write_policy = '99PERCENTILE'
    AND bloom_filter_fp_chance = 0.01
    AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.UnifiedCompactionStrategy'}
    AND compression = {'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND crc_check_chance = 1.0
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair = 'BLOCKING'
    AND speculative_retry = '99PERCENTILE';